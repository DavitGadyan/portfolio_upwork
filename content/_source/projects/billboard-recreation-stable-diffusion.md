# project-24 → billboard-recreation-stable-diffusion

## Hugo front matter

```json
{
  "title": "Expert Needed for AI-Generated Recreation of Billboard Publicity Image",
  "date": "2024-04-03T06:14:34.000Z",
  "image": "images/portfolio/ai_billboard_det_upscale.png",
  "categories": [
    "deep learning",
    "computer vision",
    "stable diffusion"
  ],
  "description": "",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Leonardo Santamaria"
    }
  ]
}
```

## Hugo body

Project goals were to develop AI algorithm to detect billboards in images, extract boundaries, upscale image to higher resolution and change the details in the image.

#### Project Details

I have creared AI algorithm to detect billboard in an image with Grounding DINO.

Billabord was extracted using OPEN CV with coordinates of bounding boxes from detector model. This processed image was sent as input to Stable Diffusion model with the following parameters to produce image on the right.
Stable Diffusion parameters to upscale image:

a man holding a bottle of soda in front of a billboard sign for a restaurant in mexico, with a picture of a man holding a bottle of soda, Ceferí Olivé, ignacio fernandez rios, a stock photo, regionalism
Negative prompt: 16-token-negative-deliberate-neg, black lines
Steps: 84, Sampler: DPM2 Karras, CFG scale: 3.5, Seed: 326108416, Size: 1280x1664, Model hash: ef76aa2332, Model: realisticVisionV60B1_v51VAE, Denoising strength: 0.4, Ultimate SD upscale upscaler: 4x-UltraSharp, Ultimate SD upscale tile_width: 512, Ultimate SD upscale tile_height: 512, Ultimate SD upscale mask_blur: 8, Ultimate SD upscale padding: 32, Soft inpainting enabled: True, Soft inpainting schedule bias: 1, Soft inpainting preservation strength: 0.5, Soft inpainting transition contrast boost: 4, Soft inpainting mask influence: 0, Soft inpainting difference threshold: 0.5, Soft inpainting difference contrast: 2, Mask blur: 8, Inpaint area: Only masked, Masked area padding: 32, ControlNet 0: "Module: tile_resample, Model: control_v11f1e_sd15_tile [a371b31b], Weight: 1, Resize Mode: Crop and Resize, Low Vram: False, Threshold A: 2.09, Guidance Start: 0, Guidance End: 1, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True", TI hashes: "16-token-negative-deliberate-neg: ec6a52b7f30d", Refiner: cyberrealistic_v41BackToBasics (1) [925bd947d7], Refiner switch at: 0.14, Version: v1.8.0

## Catalogue entry

```json
{
  "id": "project-24",
  "title": "Expert Needed for AI-Generated Recreation of Billboard Publicity Image",
  "site_title": "Expert Needed for AI-Generated Recreation of Billboard Publicity Image",
  "date": "2024-04-03",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-24/",
  "client": "Leonardo Santamaria",
  "listed": true,
  "summary": "Pipeline that detects a billboard in a photo, extracts it, upscales it and regenerates its content with Stable Diffusion.",
  "themes": [
    "Computer vision",
    "LLM fine-tuning & generative content"
  ],
  "industries": [
    "Advertising"
  ],
  "domains": [
    "Computer vision",
    "Generative AI (image)",
    "Advertising"
  ],
  "skills": [
    "Grounding DINO",
    "OpenCV",
    "Stable Diffusion",
    "ControlNet (tile_resample)",
    "Ultimate SD Upscale",
    "Inpainting",
    "Prompt engineering"
  ],
  "site_tags": [
    "Deep Learning",
    "Computer Vision",
    "Stable Diffusion"
  ],
  "role": "Sole builder",
  "outcomes": [
    "Zero-shot billboard detection with Grounding DINO feeding an SD inpaint/upscale chain",
    "Full reproducible generation parameters documented"
  ],
  "cv_bullet": "Built a billboard recreation pipeline: Grounding DINO zero-shot detection, OpenCV extraction from bounding boxes, then Stable Diffusion with ControlNet tile_resample and Ultimate SD Upscale to regenerate and upscale the advert in place.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/ai_billboard_det_upscale.png",
  "source_text": "Project goals were to develop AI algorithm to detect billboards in images, extract boundaries, upscale image to higher resolution and change the details in the image.\n\n#### Project Details\n\nI have creared AI algorithm to detect billboard in an image with Grounding DINO.\n\nBillabord was extracted using OPEN CV with coordinates of bounding boxes from detector model. This processed image was sent as input to Stable Diffusion model with the following parameters to produce image on the right. Stable Diffusion parameters to upscale image:\n\na man holding a bottle of soda in front of a billboard sign for a restaurant in mexico, with a picture of a man holding a bottle of soda, Ceferí Olivé, ignacio fernandez rios, a stock photo, regionalism Negative prompt: 16-token-negative-deliberate-neg, black lines Steps: 84, Sampler: DPM2 Karras, CFG scale: 3.5, Seed: 326108416, Size: 1280x1664, Model hash: ef76aa2332, Model: realisticVisionV60B1_v51VAE, Denoising strength: 0.4, Ultimate SD upscale upscaler: 4x-UltraSharp, Ultimate SD upscale tile_width: 512, Ultimate SD upscale tile_height: 512, Ultimate SD upscale mask_blur: 8, Ultimate SD upscale padding: 32, Soft inpainting enabled: True, Soft inpainting schedule bias: 1, Soft inpainting preservation strength: 0.5, Soft inpainting transition contrast boost: 4, Soft inpainting mask influence: 0, Soft inpainting difference threshold: 0.5, Soft inpainting difference contrast: 2, Mask blur: 8, Inpaint area: Only masked, Masked area padding: 32, ControlNet 0: “Module: tile_resample, Model: control_v11f1e_sd15_tile [a371b31b], Weight: 1, Resize Mode: Crop and Resize, Low Vram: False, Threshold A: 2.09, Guidance Start: 0, Guidance End: 1, Pixel Perfect: True, Control Mode: Balanced, Hr Option: Both, Save Detected Map: True”, TI hashes: “16-token-negative-deliberate-neg: ec6a52b7f30d”, Refiner: cyberrealistic_v41BackToBasics (1) [925bd947d7], Refiner switch at: 0.14, Version: v1.8.0",
  "also_published_as": []
}
```
