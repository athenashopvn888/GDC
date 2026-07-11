from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "image" / "GreenDeal_Cannabis_favicon.webp"

PNG_SIZES = [16, 32, 48, 64, 128, 180, 192, 256, 512]
ICO_SIZES = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]


def save_png(img: Image.Image, path: Path, size: int) -> None:
    resized = img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(path, format="PNG", optimize=True)


def main() -> None:
    img = Image.open(SOURCE).convert("RGBA")

    for size in PNG_SIZES:
        save_png(img, ROOT / f"favicon-{size}x{size}.png", size)

    save_png(img, ROOT / "app" / "icon.png", 512)
    save_png(img, ROOT / "app" / "apple-icon.png", 180)
    save_png(img, ROOT / "public" / "favicon-192x192.png", 192)
    save_png(img, ROOT / "public" / "favicon-512x512.png", 512)

    img.save(ROOT / "favicon.ico", format="ICO", sizes=ICO_SIZES)
    img.save(ROOT / "app" / "favicon.ico", format="ICO", sizes=ICO_SIZES)
    img.resize((256, 256), Image.Resampling.LANCZOS).save(
        ROOT / "favicon-256x256.webp",
        format="WEBP",
        quality=90,
        method=6,
    )

    print("GreenDeal favicon assets updated from image/GreenDeal_Cannabis_favicon.webp")


if __name__ == "__main__":
    main()
