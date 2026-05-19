from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
INPUT_ROOTS = [
    PUBLIC / "works" / "optimized",
]
OUTPUT_ROOT = PUBLIC / "works" / "responsive"
WIDTHS = (480, 800, 1200)
SUPPORTED = {".jpg", ".jpeg", ".png"}


def output_path(source: Path, width: int) -> Path:
    relative = source.relative_to(PUBLIC / "works")
    return OUTPUT_ROOT / relative.parent / f"{relative.stem}-{width}.webp"


def resize_image(source: Path, width: int) -> None:
    target = output_path(source, width)
    target.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as image:
        image = image.convert("RGB")
        target_width = min(width, image.width)
        target_height = round(image.height * (target_width / image.width))
        resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
        resized.save(target, "WEBP", quality=70 if width <= 480 else 74, method=6)


def main() -> None:
    generated = 0

    for input_root in INPUT_ROOTS:
        for source in input_root.rglob("*"):
            if source.suffix.lower() not in SUPPORTED:
                continue

            for width in WIDTHS:
                resize_image(source, width)
                generated += 1

    print(f"Generated {generated} responsive WebP images in {OUTPUT_ROOT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
