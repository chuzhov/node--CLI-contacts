const { program } = require("commander");
const cm = require("./contacts");

// const program = new Command();

program
  .option(
    "-a, --action <type>",
    "choose action: list | add | get | remove"
  )
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({
  action,
  id,
  name,
  email,
  phone,
}) {
  switch (action) {
    case "list":
      const contacts = await cm.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await cm.getContactById(id);
      console.dir(
        contact ||
          "🟥 No contact found with this id:",
        id
      );
      break;

    case "add":
      const newbie = await cm.addContact(
        name,
        email,
        phone
      );
      newbie &&
        console.log(
          `🟩 New contact \x1b[1m ${newbie.name} \u001b[0m successfully added with id ${newbie.id}`
        );
      break;

    case "remove":
      const deleted = await cm.removeContact(id);
      if (deleted) {
        console.log(
          `🟩 Contact \x1b[1m ${deleted.name} \u001b[0m was successfully deleted`
        );
      } else
        console.warn(
          "\x1B[31m 🟥 Could not find contact with id ",
          id
        );
      break;

    default:
      console.warn(
        "\x1B[31m Unknown action type!"
      );
  }
}

invokeAction(argv);
