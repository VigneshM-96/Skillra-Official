import qrcode
from PIL import Image

# 🔹 Your URL
url = "https://skillra.com/"

# 🔹 Create QR with HIGH error correction (important for logo)
qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4
)

qr.add_data(url)
qr.make(fit=True)

# 🔹 Generate base QR
qr_img = qr.make_image(fill_color="black", back_color="white").convert('RGB')

# 🔹 Open your logo
logo = Image.open("skillralogo.png")  # <-- your first image

# 🔹 Resize logo (important: not too big)
qr_w, qr_h = qr_img.size
logo_size = qr_w // 4
logo = logo.resize((logo_size, logo_size))

# 🔹 Position logo at center
pos = ((qr_w - logo_size) // 2, (qr_h - logo_size) // 2)
qr_img.paste(logo, pos, mask=logo if logo.mode == 'RGBA' else None)

# 🔹 Apply gradient color (blue → purple)
pixels = qr_img.load()
for y in range(qr_img.size[1]):
    for x in range(qr_img.size[0]):
        r, g, b = pixels[x, y]
        if (r, g, b) == (0, 0, 0):  # only change black pixels
            # gradient effect
            ratio = x / qr_img.size[0]
            blue = int(255 * (1 - ratio))
            purple = int(255 * ratio)
            pixels[x, y] = (blue//2, 0, purple)

# 🔹 Save final QR
qr_img.save("skillra_final_qr.png")

print("✅ QR Code Generated Successfully!")