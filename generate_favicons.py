import os
from PIL import Image, ImageDraw

def generate_assets():
    # Exact vector SVG matching original SAVERRA logo geometry with floating inner bars and gaps
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71 181" width="100%" height="100%">
  <g fill="#012aff">
    <!-- Top Horizontal Bar -->
    <rect x="0" y="0" width="71" height="10" />
    
    <!-- Top Left Outer Bar (connects top to middle) -->
    <rect x="0" y="0" width="10" height="92" />
    
    <!-- Top Right Outer Bar (with gap before middle bar) -->
    <rect x="61" y="0" width="10" height="75" />
    
    <!-- Top Floating Inner Bar 1 (with top & bottom gap) -->
    <rect x="20" y="15" width="10" height="60" />
    
    <!-- Top Floating Inner Bar 2 (with top & bottom gap) -->
    <rect x="41" y="15" width="10" height="60" />
    
    <!-- Middle Horizontal Bar -->
    <rect x="0" y="83" width="71" height="10" />
    
    <!-- Bottom Right Outer Bar (connects middle to bottom) -->
    <rect x="61" y="83" width="10" height="98" />
    
    <!-- Bottom Left Outer Bar (with gap after middle bar) -->
    <rect x="0" y="103" width="10" height="78" />
    
    <!-- Bottom Floating Inner Bar 1 (with top & bottom gap) -->
    <rect x="20" y="104" width="10" height="60" />
    
    <!-- Bottom Floating Inner Bar 2 (with top & bottom gap) -->
    <rect x="41" y="104" width="10" height="60" />
    
    <!-- Bottom Horizontal Bar -->
    <rect x="0" y="171" width="71" height="10" />
  </g>
</svg>"""

    with open("public/favicon.svg", "w", encoding="utf-8") as f:
        f.write(svg_content)
    print("Updated public/favicon.svg with exact original floating bars and gaps!")

    # Render ultra-crisp PNGs
    def render_png(size):
        ss = 4
        s_canvas = size * ss
        img = Image.new("RGBA", (s_canvas, s_canvas), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Scale factor for emblem (width 71, height 181)
        pad_y = s_canvas * 0.03
        target_h = s_canvas - (2 * pad_y)
        target_w = target_h * (71.0 / 181.0)
        
        offset_x = (s_canvas - target_w) / 2.0
        offset_y = pad_y

        def r_box(x, y, w, h):
            rx1 = offset_x + (x / 71.0) * target_w
            ry1 = offset_y + (y / 181.0) * target_h
            rx2 = offset_x + ((x + w) / 71.0) * target_w
            ry2 = offset_y + ((y + h) / 181.0) * target_h
            return [int(round(rx1)), int(round(ry1)), int(round(rx2)), int(round(ry2))]

        color = (1, 42, 255, 255) # Electric brand royal blue #012aff

        rects = [
            # Top Horizontal Bar
            (0, 0, 71, 10),
            # Top Left Outer Bar
            (0, 0, 10, 92),
            # Top Right Outer Bar
            (61, 0, 10, 75),
            # Top Floating Inner Bar 1
            (20, 15, 10, 60),
            # Top Floating Inner Bar 2
            (41, 15, 10, 60),
            # Middle Horizontal Bar
            (0, 83, 71, 10),
            # Bottom Right Outer Bar
            (61, 83, 10, 98),
            # Bottom Left Outer Bar
            (0, 103, 10, 78),
            # Bottom Floating Inner Bar 1
            (20, 104, 10, 60),
            # Bottom Floating Inner Bar 2
            (41, 104, 10, 60),
            # Bottom Horizontal Bar
            (0, 171, 71, 10),
        ]

        for x, y, w, h in rects:
            box = r_box(x, y, w, h)
            draw.rectangle(box, fill=color)

        return img.resize((size, size), Image.Resampling.LANCZOS)

    sizes = [16, 32, 48, 96, 144, 192, 512]
    imgs = {}
    for s in sizes:
        png = render_png(s)
        png.save(f"public/favicon-{s}x{s}.png", "PNG")
        imgs[s] = png
        print(f"Generated public/favicon-{s}x{s}.png")

    imgs[512].save("public/favicon.png", "PNG")
    imgs[192].save("public/apple-touch-icon.png", "PNG")

    # Multi-resolution ICO
    imgs[48].save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Generated public/favicon.ico with exact master logo geometry!")

if __name__ == "__main__":
    generate_assets()
