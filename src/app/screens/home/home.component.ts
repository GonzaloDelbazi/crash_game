import { PlayersService } from './../../api/players.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Bet from 'src/app/models/Bet';
import { User } from 'src/app/models/User';
import Game from 'src/app/models/Games';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  openModal: boolean = true;
  isCrash: boolean = false;
  isOpenBet: boolean = false;
  isPersonalBet: boolean;
  balanceUser: number = 1;
  valueCrash: number = 1;
  timeToBet: number = 5;
  playersData: Bet[];
  betList: Bet[];
  crashHistory = [];
  gamesHistory: Game[] = [];
  personalHistory: Game[] = [];
  displayedColumns: string[] = ['Username', 'Bet', 'Balance'];
  winnersColumns: string[] = [
    'CRASH',
    '@',
    'GRAN GANADOR',
    'Apuesta',
    'GANANCIA',
  ];
  rowWinners: {}[] = [
    {
      columnName: 'CRASH',
      element: (value) => value.crashValue,
    },
    {
      columnName: '@',
      element: (value) => value.player.bet,
    },
    {
      columnName: 'GRAN GANADOR',
      element: (value) => value.player.username,
    },
    {
      columnName: 'Apuesta',
      element: (value) => value.player.balance,
    },
    {
      columnName: 'GANANCIA',
      element: (value) =>
        (
          value.player.balance * value.player.bet -
          value.player.balance
        ).toFixed(2),
    },
  ];
  personalColumns: string[] = ['CRASH', '@', 'Apuesta', 'GANANCIA'];
  personalHistoryRows: {}[] = [
    {
      columnName: 'CRASH',
      element: (value) => value.crashValue,
    },
    {
      columnName: '@',
      element: (value) => value.player.bet,
    },
    {
      columnName: 'Apuesta',
      element: (value) => value.player.balance,
    },
    {
      columnName: 'GANANCIA',
      element: (value) =>
        (
          value.player.balance * value.player.bet -
          value.player.balance
        ).toFixed(2),
    },
  ];
  columnsPlayers: {}[] = [
    {
      columnName: 'Username',
      element: (value) => value.username,
    },
    {
      columnName: 'Bet',
      element: (value) => this.isCrashed(value),
    },
    {
      columnName: 'Balance',
      element: (value) => value.balance,
    },
  ];
  currentBet: Bet = {
    username: '',
    bet: 0,
    balance: 0,
  };
  currentUser: User = {
    username: '',
    balance: 0,
  };

  constructor(private playersService: PlayersService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('usuario');
    if (user) {
      this.openModal = false;
      this.currentUser = JSON.parse(user);
      this.getDataPlayers();
      this.getPlayersBets();
      this.crashEvent();
    }
  }

  saveData(form: FormGroup) {
    if (form.valid) {
      const user = form.value;
      localStorage.setItem('usuario', JSON.stringify(user));
      this.openModal = true;
      this.ngOnInit();
    } else {
      alert('Rellene todos los campos');
    }
  }

  startBet() {
    console.log(this.currentBet);
    this.currentBet.username = this.currentUser.username;
    this.isPersonalBet = true;
    this.playersService.setPlayersSubject(this.currentBet, 'players');
    // SAVE BET
  }

  formatSlider(data: number): string {
    return `$${data}`;
  }

  onSetUser(myUser) {
    localStorage.setItem('usuario', myUser);
    this.openModal = false;
  }

  crashEvent() {
    let timer: number = 100;
    const randomNumber = this.getRandomNumber(1, 2);
    const interval = setInterval(() => {
      this.valueCrash += 0.01;
      timer -= 1;
      if (this.valueCrash > randomNumber) {
        clearInterval(interval);
        this.isCrash = true;
        this.saveHisotryGames(this.valueCrash, this.betList);
        setTimeout(() => {
          this.playersService.deletePlayersSubject('players');
          this.getDataPlayers();
          this.setPlayersBets();

          const timerBet = setInterval(() => {
            this.isCrash = false;
            this.isOpenBet = true;
            this.valueCrash = 1;
            this.timeToBet -= 0.01;
            if (this.timeToBet <= 0) {
              clearInterval(timerBet);

              this.timeToBet = 5;
              setTimeout(() => {
                this.isOpenBet = false;
                this.crashEvent();
              }, 1000);
            }
          }, 20);
        }, 5000);
      }
    }, timer);
  }

  getDataPlayers() {
    this.playersService.getPlayers().subscribe((data: Bet[]) => {
      this.playersData = data;
      console.log(this.playersData);
    });
  }

  setPlayersBets() {
    const data = this.playersData;
    console.log(data);
    let pos = 0;
    const interval = setInterval(() => {
      this.playersService.setPlayersSubject(data[pos], 'players');
      pos++;
      if (pos == data.length) {
        clearInterval(interval);
      }
    }, 100);
  }

  getPlayersBets() {
    this.playersService
      .getPlayersSubject('players')
      .subscribe((playersArr) => (this.betList = playersArr));
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  get progressBarValue() {
    return (this.timeToBet * 100) / 5;
  }

  saveHisotryGames(crash, players) {
    if (players.length > 0) {
      let bigWinner;
      bigWinner = players.filter((player) => player.bet <= crash);
      bigWinner = bigWinner.sort((a, b) => b.bet - a.bet);
      const payload = {
        crashValue: crash.toFixed(2),
        player: bigWinner[0],
      };
      if (this.isPersonalBet) {
        this.isPersonalBet = false;
        const personalBet = players.filter(
          (player) => player.username == this.currentUser.username
        );
        this.playersService.setPlayersSubject(
          { ...payload, player: personalBet[0] },
          'personalHistory'
        );
        this.playersService
          .getPlayersSubject('personalHistory')
          .subscribe((data) => (this.personalHistory = data));
      }
      this.playersService.setPlayersSubject(payload, 'historyWinners');
      this.playersService
        .getPlayersSubject('historyWinners')
        .subscribe((data) => (this.gamesHistory = data));
      if (this.crashHistory.length == 7) this.crashHistory.shift();
    }
    this.crashHistory.push(crash);
  }

  isCrashed(element) {
    return this.valueCrash < element.bet ? '-' : element.bet;
  }
}
