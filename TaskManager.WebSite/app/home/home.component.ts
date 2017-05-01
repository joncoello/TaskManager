/* tslint:disable:no-any */

import { Component, Inject } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClient } from '../shared/httpclient';
import { TaskWidgetItem } from './home.models';

import { BaseChartDirective } from 'ng2-charts';

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

    private homeUrl: string;
    private data: any;

    public pageTitle: string;

    constructor(private http: HttpClient, @Inject('API_URL') private apiURL: string) {
        this.homeUrl = apiURL + '/api/home';  // url to web API
        this.pageTitle = 'Home';
    }

    // doughnut
    public doughnutChartLabels: string[] = []; //['Urgent', 'High', 'Medium', 'Low', 'Info'];
    public doughnutChartData: number[] = []; //[18, 12, 18, 12, 13];
    public doughnutChartType: string = 'doughnut';

    public colours: Array<any> = [
        { // grey
            backgroundColor:
            [
                'rgba(240,125,136,0.7)',
                'rgba(255,140,0,0.7)',
                'rgba(254,203,111,0.7)',
                'rgba(255,241,0,0.7)',
                'rgba(86,168,89,0.7)'
            ],
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
        },
        responsive: true
    };

    // events
    public ngOnInit() {
        this.http.get(this.homeUrl)
            .map((response: Response) => {
                return <Array<TaskWidgetItem>>response.json()
            })
            .subscribe((items: Array<TaskWidgetItem>) => {
                
                let data: Array<number> = new Array<number>();
                let labels: Array<string> = new Array<string>();

                items.forEach((wi: TaskWidgetItem) => {
                    labels.push(wi.categoryName);
                    data.push(wi.count);
                });

                this.doughnutChartLabels = labels;
                setTimeout(() => {
                    this.doughnutChartData = data;
                }, 10);
                
            });
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
    
}