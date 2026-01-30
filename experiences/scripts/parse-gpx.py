#!/usr/bin/env python3
"""
GPX Parser for Adventure Athlete India
Parses GPX files and outputs elevation data for preview.html

Usage:
    python parse-gpx.py <gpx_file_path>
    python parse-gpx.py <gpx_file_path> --interval 50  # Custom interval in meters
    python parse-gpx.py <folder_path>  # Process all GPX files in folder

Output:
    JSON array ready to embed in preview.html as elevationDataSets
"""

import xml.etree.ElementTree as ET
import json
import sys
import os
import math
from pathlib import Path

# Default sampling interval in kilometers
DEFAULT_INTERVAL_M = 25  # 25 meters
DEFAULT_INTERVAL_KM = DEFAULT_INTERVAL_M / 1000  # 0.025 km


def haversine_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two GPS coordinates in kilometers."""
    R = 6371  # Earth's radius in km

    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)

    a = (math.sin(delta_lat / 2) ** 2 +
         math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


def parse_gpx(gpx_path, interval_km=DEFAULT_INTERVAL_KM):
    """
    Parse a GPX file and return elevation data sampled by distance.

    Args:
        gpx_path: Path to GPX file
        interval_km: Sampling interval in kilometers (default 0.025 = 25m)

    Returns:
        dict with name, data (distance/elevation pairs), and stats
    """
    tree = ET.parse(gpx_path)
    root = tree.getroot()

    # Handle GPX namespace
    ns = {'gpx': 'http://www.topografix.com/GPX/1/1'}

    # Try with namespace first, then without
    trkpts = root.findall('.//gpx:trkpt', ns)
    if not trkpts:
        trkpts = root.findall('.//{http://www.topografix.com/GPX/1/1}trkpt')
    if not trkpts:
        trkpts = root.findall('.//trkpt')

    if not trkpts:
        print(f"Warning: No track points found in {gpx_path}", file=sys.stderr)
        return None

    # Extract all points with cumulative distance
    all_points = []
    cumulative_distance = 0
    prev_lat, prev_lon = None, None

    for trkpt in trkpts:
        lat = float(trkpt.get('lat'))
        lon = float(trkpt.get('lon'))

        # Get elevation - try different element names
        ele_elem = trkpt.find('gpx:ele', ns)
        if ele_elem is None:
            ele_elem = trkpt.find('{http://www.topografix.com/GPX/1/1}ele')
        if ele_elem is None:
            ele_elem = trkpt.find('ele')

        elevation = float(ele_elem.text) if ele_elem is not None else 0

        # Calculate distance from previous point
        if prev_lat is not None:
            cumulative_distance += haversine_distance(prev_lat, prev_lon, lat, lon)

        all_points.append({
            'distance': cumulative_distance,
            'elevation': elevation
        })

        prev_lat, prev_lon = lat, lon

    # Sample by distance (every interval_km)
    sampled_data = []
    next_sample_distance = 0

    for point in all_points:
        if point['distance'] >= next_sample_distance:
            sampled_data.append({
                'distance': round(point['distance'], 2),
                'elevation': round(point['elevation'], 1)
            })
            next_sample_distance += interval_km

    # Always include the last point
    if all_points and (not sampled_data or
                       sampled_data[-1]['distance'] < all_points[-1]['distance'] - 0.01):
        sampled_data.append({
            'distance': round(all_points[-1]['distance'], 2),
            'elevation': round(all_points[-1]['elevation'], 1)
        })

    # Calculate stats
    elevations = [p['elevation'] for p in all_points]
    min_ele = round(min(elevations))
    max_ele = round(max(elevations))

    # Calculate total elevation gain (only uphill segments)
    total_gain = 0
    for i in range(1, len(all_points)):
        diff = all_points[i]['elevation'] - all_points[i-1]['elevation']
        if diff > 0:
            total_gain += diff

    total_distance = round(all_points[-1]['distance'], 1) if all_points else 0

    # Get name from filename
    name = Path(gpx_path).stem.replace('_', ' ').replace('-', ' ')

    return {
        'name': name,
        'data': sampled_data,
        'stats': {
            'min': min_ele,
            'max': max_ele,
            'gain': round(total_gain),
            'totalDistance': total_distance
        }
    }


def process_path(path, interval_m=DEFAULT_INTERVAL_M):
    """Process a single GPX file or all GPX files in a directory."""
    interval_km = interval_m / 1000
    results = []

    path = Path(path)

    if path.is_file() and path.suffix.lower() == '.gpx':
        # Single file
        result = parse_gpx(path, interval_km)
        if result:
            results.append(result)
    elif path.is_dir():
        # Directory - find all GPX files
        gpx_files = list(path.glob('*.gpx')) + list(path.glob('*.GPX'))
        for gpx_file in sorted(gpx_files):
            result = parse_gpx(gpx_file, interval_km)
            if result:
                results.append(result)
    else:
        print(f"Error: {path} is not a valid GPX file or directory", file=sys.stderr)
        sys.exit(1)

    return results


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    path = sys.argv[1]

    # Check for --interval flag
    interval_m = DEFAULT_INTERVAL_M
    if '--interval' in sys.argv:
        idx = sys.argv.index('--interval')
        if idx + 1 < len(sys.argv):
            interval_m = int(sys.argv[idx + 1])

    results = process_path(path, interval_m)

    if not results:
        print("No GPX data found", file=sys.stderr)
        sys.exit(1)

    # Output JSON
    print(json.dumps(results, indent=2))

    # Print summary to stderr
    for r in results:
        print(f"\n--- {r['name']} ---", file=sys.stderr)
        print(f"Points: {len(r['data'])}", file=sys.stderr)
        print(f"Distance: {r['stats']['totalDistance']} km", file=sys.stderr)
        print(f"Elevation: {r['stats']['min']}m - {r['stats']['max']}m", file=sys.stderr)
        print(f"Gain: {r['stats']['gain']}m", file=sys.stderr)


if __name__ == '__main__':
    main()
