# Authority Slider Feature

This feature adds an automatic glider/carousel for displaying chairman/authority figures with their photos and information.

## How to use:

1. **Add authority data to `data/profile.json`:**

```json
{
  "profile": {
    "authority": {
      "title": "Ketua Desa",
      "icon": "fas fa-crown",
      "members": [
        {
          "name": "H. Ahmad Suryanto, S.Sos",
          "position": "Kepala Desa",
          "period": "2019-2025",
          "photo": "assets/img/chairman1.jpg",
          "description": "Memimpin desa dengan dedikasi tinggi untuk kesejahteraan masyarakat"
        },
        {
          "name": "Drs. Bambang Wijaya",
          "position": "Sekretaris Desa",
          "period": "2020-2026",
          "photo": "assets/img/chairman2.jpg",
          "description": "Mendukung administrasi dan tata kelola desa yang efektif"
        }
      ]
    }
  }
}
```

2. **Add chairman photos to `assets/img/` folder:**
   - `chairman1.jpg`
   - `chairman2.jpg`
   - `chairman3.jpg`
   - etc.

## Features:
- **Automatic sliding**: Slides change every 5 seconds
- **Manual navigation**: Click dots to navigate manually
- **Hover pause**: Auto-sliding pauses when hovering
- **Responsive design**: Works on all screen sizes
- **Smooth transitions**: CSS animations for smooth sliding

## Required fields in JSON:
- `name`: Full name of the authority figure
- `position`: Their official position/title
- `period`: Service period
- `photo`: Path to their photo (recommended: square images, 400x400px minimum)
- `description`: (Optional) Brief description of their role

## Notes:
- Photos should be square for best results
- Use high-quality images (recommended: 400x400px or larger)
- The description field is optional
- If only one member is provided, navigation dots won't appear
- The slider automatically initializes when the page loads
