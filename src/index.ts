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
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(MessageVariant.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: InquirerAnswers) => {
    switch (answers.action) {
      case Action.List:
        users.showAll();
        break;
      case Action.Add:
        const user = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }, {
          name: 'age',
          type: 'number',
          message: 'Enter age',
        }]);
        users.add(user);
        break;
      case Action.Remove:
        const name = await inquirer.prompt([{
          name: 'name',
          type: 'input',
          message: 'Enter name',
        }]);
        users.remove(name.name);
        break;
      case Action.Quit:
        Message.showColorized(MessageVariant.Info, "Bye bye!");
        return;
    }

    startApp();
  });
}

startApp();