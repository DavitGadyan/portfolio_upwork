# project-14 → document-ocr-extraction-api

## Hugo front matter

```json
{
  "title": "Document OCR & data extraction",
  "date": "2021-09-29T06:14:34.000Z",
  "image": "images/portfolio/ocr.jpg",
  "categories": [
    "computer vision",
    "ocr",
    "api"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Shayan Nafisi"
    }
  ]
}
```

## Hugo body

Goal of the project was to extract data from company's various documents like driver licenses, insurance cards.

#### Project Details

Sick.org/Curogram helps customers to get an appointment with doctors and tests. As an integral part of their business users supply their documents which should be entered into Curogram's system. As the number of users grows large there was a vital need of automating this procedure in order to process large volumes of requests.

The solution was to develop an algorithm that does this job instead of manual data entry. In the prototyping stage, we have tried various methods like applying OCR i.e. extracting text and creating an NLP model which extracts custom labels. Another method was to create a Computer Vision model which detects each field like name, address, gender, etc. We build and trained custom models with Yolo and used AWS services like Textract, Comprehend, Rekognition. However, inference time was high for the client around 10 seconds for each image. That is why I have applied Textract + Regex to extract details from driver licenses and insurance cards in under 5 seconds and deployed it as REST API.

## Catalogue entry

```json
{
  "id": "project-14",
  "title": "Document OCR & data extraction",
  "site_title": "Document OCR & data extraction",
  "date": "2021-09-29",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-14/",
  "client": "Shayan Nafisi",
  "listed": true,
  "summary": "Document OCR and field extraction for driver licences and insurance cards, replacing manual data entry in a healthcare booking platform.",
  "themes": [
    "Computer vision",
    "RAG & document intelligence"
  ],
  "industries": [
    "Healthcare & insurance"
  ],
  "domains": [
    "Computer vision / OCR",
    "Healthcare",
    "API",
    "Document intelligence"
  ],
  "skills": [
    "AWS Textract",
    "AWS Comprehend",
    "AWS Rekognition",
    "YOLO",
    "Regex extraction",
    "NLP",
    "REST API",
    "Latency optimisation"
  ],
  "site_tags": [
    "Computer Vision",
    "Ocr",
    "Api"
  ],
  "role": "Sole engineer — prototyping through production API",
  "outcomes": [
    "Prototyped OCR+NLP and custom YOLO field-detection approaches; both too slow at ~10s per image",
    "Shipped Textract + regex instead, extracting fields in under 5 seconds",
    "Deployed as a REST API replacing manual data entry at scale for Sick.org / Curogram"
  ],
  "cv_bullet": "Replaced manual document data entry at a healthcare booking platform with an OCR extraction API for driver licences and insurance cards — benchmarked custom YOLO and NLP models against AWS Textract, then shipped a Textract + regex approach that cut per-image latency from ~10s to under 5s.",
  "links": [],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/ocr.jpg",
  "source_text": "Goal of the project was to extract data from company’s various documents like driver licenses, insurance cards.\n\n#### Project Details\n\nSick.org/Curogram helps customers to get an appointment with doctors and tests. As an integral part of their business users supply their documents which should be entered into Curogram’s system. As the number of users grows large there was a vital need of automating this procedure in order to process large volumes of requests.\n\nThe solution was to develop an algorithm that does this job instead of manual data entry. In the prototyping stage, we have tried various methods like applying OCR i.e. extracting text and creating an NLP model which extracts custom labels. Another method was to create a Computer Vision model which detects each field like name, address, gender, etc. We build and trained custom models with Yolo and used AWS services like Textract, Comprehend, Rekognition. However, inference time was high for the client around 10 seconds for each image. That is why I have applied Textract + Regex to extract details from driver licenses and insurance cards in under 5 seconds and deployed it as REST API.",
  "also_published_as": []
}
```
