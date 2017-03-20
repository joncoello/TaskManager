import { Component } from '@angular/core';

import { GridService } from './grid.service';

import { Http, Response } from '@angular/http';

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
            `
})
export class GridComponent {
    pageTitle: string = 'Transactions';
    data = [
        { description: 'Phone', amount: '100' },
        { description: 'Stationary', amount: '300'  },
        { description: 'Rent', amount: '500' }
    ];

    constructor(private gridService: GridService) {
    }

    public onSubmit(): void {
        this.gridService.saveGrid(this.data)
            .subscribe((res: Response) => {
                console.log(res);
            });
    }
}