import { Component } from '@angular/core';

import { GridService } from './grid.service';

import { RedComponentComponent } from './red-component.component';

import { Http, Response } from '@angular/http';

import { GridOptions } from "ag-grid";

@Component({
    selector: 'grid',
    template: `
            <h2>{{pageTitle}}</h2>
             <form   id="taskEdit"
                (ngSubmit)="onSubmit()">
                <table>
                    <tr *ngFor='let item of data'>
                        <td>
                        <label>{{item.description}}</label>
                        </td>
                        <td class="amount-cell">
                        <label>{{item.amount}}</label>
                        </td>
                    </tr>
                </table>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
            <ag-grid-angular #agGrid style="width: 100%; height: 200px;" class="ag-fresh"
                [gridOptions]="gridOptions">
            </ag-grid-angular>
            `

    /*
    <ag-grid-angular #agGrid style="width: 100%; height: 200px;" class="ag-fresh"
                [gridOptions]="gridOptions">
            </ag-grid-angular>
    */

})
export class GridComponent {
    pageTitle: string = 'Transactions';
    data = [
        { description: 'Phone', amount: '100' },
        { description: 'Stationary', amount: '300'  },
        { description: 'Rent', amount: '500' }
    ];

    private gridOptions: GridOptions;

    constructor(private gridService: GridService) {
        this.gridOptions = {};
        this.gridOptions.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                width: 100
            },
            {
                headerName: "Value",
                field: "value",
                //cellRendererFramework: RedComponentComponent,
                width: 100
            },

        ];
        this.gridOptions.rowData = [
            { id: 5, value: 10 },
            { id: 10, value: 15 },
            { id: 15, value: 20 }
        ]
    }

    public onSubmit(): void {
        this.gridService.saveGrid(this.data)
            .subscribe((res: Response) => {
                console.log(res);
            });
    }
}