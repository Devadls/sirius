import { Component, OnInit,ViewChild, ElementRef, HostListener } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('dragScroll', {read: DragScrollComponent, static: true}) ds: DragScrollComponent;
  fixedMenu:boolean = false;
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    if(scroll > 79){
      this.fixedMenu = true;
    }
    else{
      this.fixedMenu = false;
    }
    
    
  }

  fadeInSuccess:boolean = false;
  submitted = false;
  styleObj:any = {};
  cloudData:any = [];
  destinationData:any = [];
  tempSlideNo:number = 0;
  fadeInClass:boolean = false;
  dragMoveLeft:number = 0;
  constructor(private appservice:AppserviceService,private formBuilder: FormBuilder) {}

   quoteForm: FormGroup = this.formBuilder.group({});
   
  


  ngOnInit(): void {
    this.quoteForm = this.formBuilder.group({
      yourName: ['', Validators.required],
      contactNo: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
  });
    this.getCloud();
    this.getDestination();
    this.getCountDownTimer();
  }
timerLoad:string = '';

  getCountDownTimer(){
  let countDownDate = new Date("sep 10, 2021 18:00:00").getTime();
  let x = setInterval(() => {
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  this.timerLoad = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  if (distance < 0) {
    clearInterval(x);
    this.timerLoad = "EXPIRED";
  }
}, 1000);
  }

getDestination(){
  this.appservice.getDestinationList().subscribe((data:any) =>{
    console.log(data);
    if(data){
      setTimeout(() =>{
        this.fadeInClass = true;
      },500);
      this.destinationData = data.result ? data.result : [];
      if(this.destinationData && this.destinationData.length > 0){
        if(window.innerWidth > 1100){
          this.dragMoveLeft = (window.innerWidth - 1100) / 2;
        }
        setTimeout(() => {
          this.ds.moveTo(0);
        }, 0);
      }
    }
  })
}

  getCloud(){
    this.appservice.getWeatherList().subscribe((data:any) =>{
      console.log(data);
      let result = data;
      if(data && data){
        this.cloudData = data.result ? data.result : [];
      }
    })
  }


// Form events

  get f() { return this.quoteForm.controls; }

  quoteFormSubmit() {
      this.submitted = true;
      if (this.quoteForm.invalid) {
          return;
      }
      this.fadeInSuccess = true;
  }

  // event for only number input type
  isNumberKey(evt:any)
       {
          let charCode = (evt.which) ? evt.which : evt.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;
          return true;
       }


ScrollIntoView(elem: string) {
const element = document.querySelector<HTMLElement>(elem);
if (element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
}




}
