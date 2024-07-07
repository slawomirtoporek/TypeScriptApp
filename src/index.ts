const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

type InquirerAnswers = {
  action: Action
}

enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info",
}

class Message {
  private content: string;

  constructor(content: string) {
    this.content = content;
  } 

  public show() {
    console.log(this.content);
  }
  
  public capitalize() {
    this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLocaleLowerCase();
  }

  public toUpperCase() {
    this.content = this.content.toUpperCase();
  }

  public toLowerCase() {
    this.content = this.content.toLowerCase();
  }

  static showColorized(variant: MessageVariant, text: string): void {
    if (variant === MessageVariant.Success) {
        consola.success(text);
    } else if (variant === MessageVariant.Error) {
        consola.error(text);
    } else if (variant === MessageVariant.Info) {
        consola.info(text);
    } 
  }
}

const msg = new Message("heLlo world!");
msg.show(); // "heLlo world!"
msg.capitalize();
msg.show(); // "Hello world!"
msg.toLowerCase();
msg.show(); // "hello world!"
msg.toUpperCase();
msg.show(); // "HELLO WORLD!"
Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"

type User = {
  name: string;
  age: number;
}

class UsersData {
  private data: User[] = [];

  public showAll(): void {
    Message.showColorized(MessageVariant.Info, "Users data");
    if (this.data.length === 0) {
      consola.info("No data...")
    } else {
      console.table(this.data)
    }
  }

  public add(user: User): void {
    if (user.name.length > 0 && user.age > 0) {
      this.data.push(user);
      Message.showColorized(MessageVariant.Success, "User has been successfully added!");
    } else {
      Message.showColorized(MessageVariant.Error, "Wrong data!")
    }
  }

  public remove(name: string) {
    const index = this.data.findIndex(user => user.name === name);

    if (index !== -1) {
        this.data.splice(index, 1);
        Message.showColorized(MessageVariant.Success, "User deleted!")
    } else {
      Message.showColorized(MessageVariant.Error, "User not found...");
    }
  }
}

const users = new UsersData();
users.showAll();
users.add({ name: "Jan", age: 20 });
users.add({ name: "Adam", age: 30 });
users.add({ name: "Kasia", age: 23 });
users.add({ name: "Basia", age: -6 });
users.showAll();
users.remove("Maurycy");
users.remove("Adam");
users.showAll();