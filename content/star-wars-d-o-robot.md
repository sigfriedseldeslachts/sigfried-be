---
title: "[WIP] Robot Star Wars D-O Build"
description: A few years ago a friend started building the Star Wars D-O robot. I thought it would be a cool project to do for myself as well. I then started printing the parts but had to be put on hold.
published_at: 2023-05-19T00:00:00+00:00
author: Sigfried
---

Recently I picked up the project again and started to print the parts again, most of main body parts are printed. Only the head is left. Also a massive shout out Michael Baddeley for creating the actual D-O design. He also has a lot of other Star Wars robots that you can print on his Patreon page: https://patreon.com/mrbaddeley. Please consider supporting him if you like his designs or want to build one of his robots. Also remember that my project is still a work in progress, so I will update this page as I go along.

My goal was to make the robot a little bit smarter, for example, let it navigate by itself. That would require hefty modifications on the software part.

## The software part

The original design by Mr Baddeley uses an [Arduino Mega 2560](https://store.arduino.cc/products/arduino-mega-2560-rev3), it's kinda bulky and would never work for making it properly "autonomous". Apart from that it also has an additional [Arduino Nano](https://store.arduino.cc/products/arduino-nano) for the audio sounds. In my design, I have scrapped both. Instead, I'm using a [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) a [Raspberry Pi Pico](https://www.raspberrypi.com/products/raspberry-pi-pico/).

Currently, the Raspberry Pi 3 is the brains of the whole deal. It's running [ROS (Robot Operating System)](https://www.ros.org/) which is, not an operating system but a set of software libraries and tools that help build a robot, it's also used by big organisations.
ROS will handle the navigation, communication between different devices and the audio. The Raspberry Pi Pico is used to control the motors and the headbox. It's connected with an MPU-6050 acelerometer and gyroscope to keep the head level. For the motor driver I am using the [Cytron MDD10A](https://www.cytron.io/p-10amp-5v-30v-dc-motor-driver-2-channels) like the original design.

## The hardware part

Most of the essential components of the main body are printed and partially assembled.

As said above, the original design used an Arduino Mega and also had a mount designed for it. Since I'm using a Raspberry Pi 4, I had to design a new mount for it. The result can be seen here:

![Raspberry Pi 4 mounted on a 3D printed board with an MPU 6060 on a small tower next to it](/images/blog/dorobot/rpi4mountwithmpu.jpeg)
