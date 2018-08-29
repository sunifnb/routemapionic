import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
    @ViewChild('map') mapElement: ElementRef; 
    map: any;
    showMap : true;

    constructor(public navCtrl: NavController) {
 
    }
 
    ionViewDidLoad() { 
        this.loadMap();
        this.startNavigating(); 
    }
 
    loadMap(){ 
        let latLng = new google.maps.LatLng(13.232, 80.23423); 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,          
          fullscreenControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        } 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 
    }
 
    startNavigating() { 
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer; 
        directionsDisplay.setMap(this.map);  
        directionsService.route({
            //origin: 'Chennai',
            //destination: 'Pondicherry',
            origin: {lat: 13.3234, lng: 80.23423},
            destination: {lat: 13.2344, lng: 78.23423},
            travelMode: google.maps.TravelMode['DRIVING'],  
        }, (res, status) => { 
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res); 
            } else {
                console.warn(status);
            } 
        }); 
    } 

    hideMap() {
        if (this.mapElement.nativeElement) {
            if (this.mapElement.nativeElement.style.display == "none") {
                this.mapElement.nativeElement.style.display = "block";
            } else {
                this.mapElement.nativeElement.style.display = "none";
            }
        }    
    }
}