import { element } from 'protractor';
import Bet from 'src/app/models/Bet';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'table-players',
  templateUrl: './table-players.component.html',
  styleUrls: ['./table-players.component.scss']
})
export class TablePlayersComponent implements OnInit {
  @Input () playersArray: Bet[];
  @Input () crashValue: number;
  @Input () isCrash: boolean;
  @Input () customStyle: boolean = false;
  @Input () columnsPlayers: {}[];
  @Input () displayedColumns: string[];


  dataArray = [
    {
    userName: 'Gonzalo',
    balance: 5000,
    bet: 2
    },
    {
    userName: 'Naiara',
    balance: 5000,
    bet: 2
    },
    {
    userName: 'Martin',
    balance: 5000,
    bet: 2
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  betsStylesResults(element) {
    if( this.crashValue >= element.bet ) {
      return 'title-green';
    } else if(this.isCrash) return 'title-red';
    return '';
  }



}
