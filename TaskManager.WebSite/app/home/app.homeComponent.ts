import { Component } from '@angular/core';

@Component({
    selector: 'home',
    template: `
        <h2>{{pageTitle}}</h2>
        <div style="display: block">
          <canvas baseChart
                      style="max-width: 500px;"
                      [data]="doughnutChartData"
                      [labels]="doughnutChartLabels"
                      [chartType]="doughnutChartType"
                      [colors]="colours"
                      [options]="options"
                      (chartHover)="chartHovered($event)"
                      (chartClick)="chartClicked($event)"></canvas>
        </div>
    `
})
export class HomeComponent {

    public pageTitle: string;

    constructor() {
        this.pageTitle = 'Home';
    }

    // Doughnut
    public doughnutChartLabels: string[] = ['Urgent', 'High', 'Medium', 'Low', 'Info'];
    public doughnutChartData: number[] = [18, 12, 18, 12, 13];
    public doughnutChartType: string = 'doughnut';
    
    public colours: Array<any> = [
        { // grey
            backgroundColor: ['rgba(240,125,136,0.7)', 'rgba(255,140,0,0.7)', 'rgba(254,203,111,0.7)', 'rgba(255,241,0,0.7)', 'rgba(86,168,89,0.7)'],
            borderColor: '#fff',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public options: any = {
        legend: {
            position: 'right'
        }
    };

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

}