import { LightningElement, track } from "lwc";

export default class GridComponent extends LightningElement {
  @track numbers = Array.from({ length: 25 }, (_, i) => i + 1); // Numbers 1 to 25
  @track playerName = "";
  @track playerKey = "";
  @track playerMap = new Map();
  @track showSponserGame = false;
  @track activeplayerListFlag = false;
  @track eliminatedPlayerListFlag = false;
  @track playerNameError = "";
  @track playerKeyError = "";
  @track activePlayers = [];
  @track inactivePlayers = [];

  handleNameChange(event) {
    this.playerName = event.target.value;
    //  this.validatePlayerName();
  }
  validatePlayerName() {
    const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
    if (!this.playerName) {
      this.playerNameError = "Player name cannot be empty";
    } else if (!namePattern.test(this.playerName)) {
      this.playerNameError = "Enter a valid name. Ex: Sahil Thakar";
    } else {
      this.playerNameError = "";
    }
  }
  handleKeyChange(event) {
    this.playerKey = event.target.value;
    //  this.validatePlayerKey();
  }
  validatePlayerKey() {
    const key = parseInt(this.playerKey, 10);
    if (!this.playerKey) {
      this.playerKeyError = "Player key cannot be empty";
    } else if (isNaN(key) || key < 1 || key > 25) {
      this.playerKeyError = "Choose from 1 to 20 only";
    } else {
      this.playerKeyError = "";
    }
  }
  handleStartGame() {
    this.handleSaveAndNew();
    this.showSponserGame = true;
    this.eliminatedPlayerListFlag = true;
  }

  handleSaveAndNew() {
    this.validatePlayerName();
    this.validatePlayerKey();

    if (this.playerName && this.playerKey) {
      this.activePlayers.push(this.playerName);
      this.playerMap.set(this.playerName, this.playerKey);
      this.playerName = "";
      this.playerKey = "";
      this.activeplayerListFlag = true;
      console.log(this.activePlayers);
    }

    console.log(this.playerMap);
    console.log(this.activePlayers);
  }

  handleNumberClick(event) {
    const gridNum = event.target.dataset.number;
    event.target.classList.add("blurred");

    const keys = [];
    for (const [key, value] of this.playerMap) {
      if (value == gridNum) {
        const index = this.activePlayers.indexOf(key);
        if (index !== -1) {
          this.activePlayers.splice(index, 1);
          this.activePlayers = [...this.activePlayers]; // Update the array to trigger reactivity
          this.inactivePlayers.push(key);
          this.inactivePlayers = [...this.inactivePlayers]; // Update the array to trigger reactivity
        }
      }
    }
  }
}
