import { Component, OnInit } from '@angular/core';
import { IFileLinks } from './file-links';

import { FileLinksService } from './file-links.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //using constructor to pass in the fileLinkService
  constructor(private _fileLinksService: FileLinksService) {}

  public fileLinks: IFileLinks;
  public haveLinks = false;
  public shouldShowVideo = true;
  public shouldShowDogs = false;
  public video;
  public imageContainer;
  public soundIconContainer;
  public dogMessage = `Just kidding! Iguanas don't make sounds, silly. Here's a doberman pinscher instead. Now get off my lawn.`;
  ngOnInit() {
    this.getFileLinks();
  }

  //changes background to image of the dogs from "Up" when user clicks sound icon
  public showDogs(myApp: HTMLElement, imageContainer: HTMLElement, soundIcon: HTMLElement) {
    this.setBackgroundImage(myApp, this.fileLinks.dogImage);
    imageContainer.textContent = this.dogMessage;
    soundIcon.style.display = 'none';
  }

  //sets video element to be an accessible property on this state
  public setVideo(video: HTMLVideoElement) {
    this.video = video;
  }

  //this admittedly needs a better name and should be refactored to just one function because it essentially does the same as setVideo above to set DOM elements as accessible props on this state, but ran out of time
  public setContainersToProps(imageContainer: HTMLElement, soundIconContainer: HTMLElement) {
    this.imageContainer = imageContainer;
    this.soundIconContainer = soundIconContainer;
  }

  //changes state if user lets video run to its end so they can see the iguana background
  public onVideoEnd(video: HTMLVideoElement) {
    video.addEventListener('ended', () => {
      this.shouldShowVideo = false;
    });
  }

  public playSoundOnClick(audio: HTMLAudioElement) {
    audio.play();
    this.shouldShowDogs = true;
  }
  public setSoundIcon(icon: HTMLElement) {
    icon.style.backgroundImage = `url('${this.fileLinks.soundIcon}')`;
  }


  public skipVideo() {
    this.shouldShowVideo = false;
  }

  //using imported HTPP get request from the fileLinksService to set the state of the file links
  public getFileLinks() {
    this._fileLinksService.getFileLinks()
    .subscribe(data =>  {
      this.haveLinks = true;
      this.fileLinks = data;
    });
  }

  //toggles background images between iguana and Up dogs
  public setBackgroundImage(app, url) {
    app.style.backgroundImage = `url('${url}')`;
  }

  //not using this function, but wanted to document that I tried to make video go full screen. Research shows that trying to do this on page load is terrible practice, so resorted to CSS instead to implement https://stackoverflow.com/questions/32642865/failed-to-execute-requestfullscreen-on-element-api-can-only-be-initiated-by?rq=1
  makeVideoFullScreen(video: HTMLVideoElement) {
    video.webkitRequestFullscreen();
  }


}
