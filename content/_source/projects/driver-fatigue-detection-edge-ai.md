# project-3 → driver-fatigue-detection-edge-ai

## Hugo front matter

```json
{
  "title": "Computer Vision | IOT",
  "date": "2021-04-19T06:14:34.000Z",
  "image": "images/portfolio/cv-iot.jpg",
  "categories": [
    "computer vision",
    "deep learning",
    "iot"
  ],
  "description": "This is meta description.",
  "draft": false,
  "project_info": [
    {
      "name": "Client",
      "icon": "fas fa-user",
      "content": "Private"
    }
  ]
}
```

## Hugo body

This project was one of the most complex ones. The ultimate goal was to detect driver fatigue and issue warnings to driver via alarms.
In addition, this system should have been deployed into IOT device like Raspberry PI 4, which introduced some limitations in terms of algorithms and methods we can use.


#### Project Details

As usual, I have started with some research for best practices and found good papers which I have used for final solution. https://www.researchgate.net/publication/342193728_A_Fatigue_Driving_Detection_Algorithm_Based_on_Facial_Motion_Information_Entropy

The first step was to detect face in video stream using ONNX library and then detect facial landmarks for further analysis.
The key point was to identify FFT and FFV (for more details please look into paper attached). Based on labeled data which was collected using simple web-camera we have trained an XGBoost model with current value and n-previous values of FFT and FFV (n=10). Based on it we were able to identify person's head position also in time dimension approximately for last 3-5 seconds and based on that issue alerts if driver keeps head down and does not move it. Later means person is fatigued and cannot drive, whereas if driver actively looks around and watches traffic there should be no alarm issued.

In addition, if person was yawning or having eyes closed alarm has been also triggered by separate rule-based algorithms.

Eventually everything was dockerized and deployed onto Jetson Nano/ PI 4 IOT devices.

## Catalogue entry

```json
{
  "id": "project-3",
  "title": "Computer Vision | IOT",
  "site_title": "Computer Vision | IOT",
  "date": "2021-04-19",
  "url": "https://davitgadyan.github.io/portfolio_app/portfolio/project-3/",
  "client": "Private",
  "listed": true,
  "summary": "Driver-fatigue detection from video, running on-device on Raspberry Pi 4 / Jetson Nano with real-time alarms.",
  "themes": [
    "Computer vision",
    "MLOps, cloud & deployment"
  ],
  "industries": [
    "Automotive",
    "IoT & edge"
  ],
  "domains": [
    "Computer vision",
    "Deep learning",
    "Edge / IoT",
    "Automotive safety"
  ],
  "skills": [
    "ONNX",
    "Facial landmark detection",
    "XGBoost",
    "Time-series features (FFT/FFV)",
    "Docker",
    "Raspberry Pi 4",
    "Jetson Nano",
    "Applied research"
  ],
  "site_tags": [
    "Computer Vision",
    "Deep Learning",
    "Iot"
  ],
  "role": "Sole engineer — research, modelling, edge deployment",
  "outcomes": [
    "Research-led approach based on a published facial-motion-entropy fatigue algorithm",
    "XGBoost over current and 10 previous FFT/FFV values to read head position over a 3-5 second window",
    "Rule-based yawn and eye-closure triggers layered on top",
    "Dockerised and deployed to Jetson Nano and Pi 4 within edge compute limits"
  ],
  "cv_bullet": "Built an on-device driver-fatigue detection system: ONNX face and landmark detection feeding an XGBoost model over FFT/FFV time-series features to read head position across a 3-5 second window, with rule-based yawn and eye-closure alarms, dockerised onto Jetson Nano and Raspberry Pi 4.",
  "links": [
    {
      "label": "Referenced",
      "url": "https://www.researchgate.net/publication/342193728_A_Fatigue_Driving_Detection_Algorithm_Based_on_Facial_Motion_Information_Entropy"
    }
  ],
  "notes": [],
  "image": "https://davitgadyan.github.io/portfolio_app/images/portfolio/cv-iot.jpg",
  "source_text": "This project was one of the most complex ones. The ultimate goal was to detect driver fatigue and issue warnings to driver via alarms. In addition, this system should have been deployed into IOT device like Raspberry PI 4, which introduced some limitations in terms of algorithms and methods we can use.\n\n#### Project Details\n\nAs usual, I have started with some research for best practices and found good papers which I have used for final solution. https://www.researchgate.net/publication/342193728_A_Fatigue_Driving_Detection_Algorithm_Based_on_Facial_Motion_Information_Entropy\n\nThe first step was to detect face in video stream using ONNX library and then detect facial landmarks for further analysis. The key point was to identify FFT and FFV (for more details please look into paper attached). Based on labeled data which was collected using simple web-camera we have trained an XGBoost model with current value and n-previous values of FFT and FFV (n=10). Based on it we were able to identify person’s head position also in time dimension approximately for last 3-5 seconds and based on that issue alerts if driver keeps head down and does not move it. Later means person is fatigued and cannot drive, whereas if driver actively looks around and watches traffic there should be no alarm issued.\n\nIn addition, if person was yawning or having eyes closed alarm has been also triggered by separate rule-based algorithms.\n\nEventually everything was dockerized and deployed onto Jetson Nano/ PI 4 IOT devices.",
  "also_published_as": []
}
```
