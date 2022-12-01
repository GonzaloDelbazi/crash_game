import { User, PlayerData } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators"
import Bet from '../models/Bet';
import Game from '../models/Games';


@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  
  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('usuario'));
  }

  currentUser: User;
  subjectsActions = {
    "players" : "this.sharingPlayers",
    "historyWinners" : "this.sharingHistoryWinners",
    "personalHistory" : "this.sharingPersonalHistory",
  }

  private sharingPlayers: BehaviorSubject<Bet[]> = new BehaviorSubject<Bet[]>([]);

  private sharingHistoryWinners: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);

  private sharingPersonalHistory: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  

  getPlayersSubject(action) {
    return eval(this.subjectsActions[action]).asObservable();
  }
  
  setPlayersSubject(payload, action) {
    eval(this.subjectsActions[action]).next([...eval(this.subjectsActions[action]).value, payload]);
  }
  
  deletePlayersSubject(action) {
    eval(this.subjectsActions[action]).next([]);
  }

  getPlayers() {
    const resp = this.http.get("https://jsonplaceholder.typicode.com/users").pipe(map((players: PlayerData[]) => players.map(item => {
      const balance = this.getRandomNumber(100, this.currentUser.balance);
      const bet = this.getRandomNumber(1, 2);
      return {
        username: item.username,
        balance: balance, 
        bet: bet
      }
    })))
    return resp;
  }

  getRandomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }
  
}

