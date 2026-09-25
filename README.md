# MapTiler Card for Home Assistant

A Lovelace map card for entities with `latitude` and `longitude` attributes. Built with MapTiler SDK JS and intended for Home Assistant 2024.12 or newer.

## Install with HACS

After publishing this repository on GitHub, add its URL in **HACS → Custom repositories** and select **Dashboard** (called **Frontend** in some HACS versions). Install MapTiler Card, then add the resource if HACS did not add it automatically:

```yaml
url: /hacsfiles/ha-maptiler-card/ha-maptiler-card.js
type: module
```

For a manual install, copy `dist/ha-maptiler-card.js` to `<config>/www/ha-maptiler-card.js` and use `/local/ha-maptiler-card.js` as the resource URL. Refresh the browser after installation or upgrades.

## Configure

```yaml
type: custom:ha-maptiler-card
api_key: YOUR_MAPTILER_API_KEY
title: Family map
height: 420px
style: streets-v2
entities:
  - person.alex
  - device_tracker.car
center: [103.8198, 1.3521] # longitude, latitude
zoom: 10
fit_bounds: true
show_zones: true
# zones: [zone.home, zone.office] # optional subset
```

| Option | Default | Description |
| --- | --- | --- |
| `api_key` | required | MapTiler browser API key |
| `entities` | `[]` | Entity IDs with valid latitude and longitude attributes |
| `title` | empty | Card heading |
| `height` | `400px` | Pixel number or CSS length |
| `style` | `streets-v2` | MapTiler style ID or style URL |
| `center` | `[0, 0]` | Fallback `[longitude, latitude]` |
| `zoom` | `2` | Fallback zoom; used for a single marker too |
| `fit_bounds` | `true` | Reframe when tracked positions change |
| `show_zones` | `false` | Show Home Assistant zone markers |
| `zones` | all zones | Limit zone markers to these entity IDs |

Entity markers use `entity_picture` when provided, otherwise an HA icon. Clicking a marker shows its name and current state. Entities without valid coordinates are skipped. Zone markers are displayed separately and do not affect automatic bounds.

## API key security

The MapTiler key runs in the browser and is visible to anyone who can load the dashboard. In your [MapTiler account](https://cloud.maptiler.com/account/keys/), create a dedicated key and restrict it to your Home Assistant dashboard origins, including every hostname you use (for example your local HA URL and remote access URL). Keep usage limits and monitoring enabled as appropriate. Do not treat the key as a secret merely because it is stored in a YAML secret: Home Assistant must send it to the browser.

## Build

Requires Node.js 20 or newer.

```sh
npm ci
npm run lint
npm run build
```

Commit the generated `dist/ha-maptiler-card.js` when releasing. HACS installs the compiled file from `dist`.

## License

MIT. MapTiler SDK JS and its dependencies retain their own licenses.
