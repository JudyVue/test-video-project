import { Component, OnInit } from '@angular/core';


// import video as video from '../../doberman-pincher_daniel-simion.mp3'

import { FileLinksService } from './file-links.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _fileLinksService: FileLinksService) {
  }




  public fileLinks;
  public haveLinks = false;
  public shouldShowVideo = true;
  public shouldShowDogs = false;
  public video;
  public imageContainer;
  public soundIconContainer;
  public dogMessage = `Just kidding! Iguanas don't make sounds, silly. Here's a doberman pinscher instead. Now get off my lawn.`;

  public showDogs(myApp: HTMLElement, imageContainer: HTMLElement, soundIcon: HTMLElement) {
    this.setBackgroundImage(myApp, this.fileLinks.dogImage);
    imageContainer.textContent = this.dogMessage;
    soundIcon.style.display = 'none';
  }

  public setVideo(video: HTMLVideoElement) {
    this.video = video;
  }

  public setContainersToProps(imageContainer: HTMLElement, soundIconContainer: HTMLElement) {
    this.imageContainer = imageContainer;
    this.soundIconContainer = soundIconContainer;
  }

  public onVideoEnd(video) {
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


  public skipVideo(event) {
    this.shouldShowVideo = false;
  }

  public getFileLinks() {
    this._fileLinksService.getFileLinks()
    .subscribe(data =>  {
      this.haveLinks = true;
      this.fileLinks = data;
    });
  }

  public setBackgroundImage(app, url) {
    app.style.backgroundImage = `url('${url}')`;
  }

  //not using this function, but wanted to document that I tried to make video go full screen. Research shows that trying to do this on page load is terrible practice https://stackoverflow.com/questions/32642865/failed-to-execute-requestfullscreen-on-element-api-can-only-be-initiated-by?rq=1
  makeVideoFullScreen(video: HTMLVideoElement) {
    video.webkitRequestFullscreen();
  }

  ngOnInit() {
    this.getFileLinks();
  }

}
