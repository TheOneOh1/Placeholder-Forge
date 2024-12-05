"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const faker_1 = require("@faker-js/faker");
function activate(context) {
    // Generator functions
    const generators = {
        generateName: () => faker_1.faker.person.fullName(),
        generateEmail: () => faker_1.faker.internet.email(),
        generatePhone: () => faker_1.faker.phone.number(),
        generateAddress: () => `${faker_1.faker.location.streetAddress()}\n${faker_1.faker.location.city()}, ${faker_1.faker.location.state()} ${faker_1.faker.location.zipCode()}`,
        generateCompany: () => faker_1.faker.company.name(),
        generateBank: () => faker_1.faker.company.name() + ' Bank',
        generateLorem: () => faker_1.faker.lorem.paragraph()
    };
    // Register commands
    Object.entries(generators).forEach(([command, generator]) => {
        let disposable = vscode.commands.registerCommand(`placeholder-generator.${command}`, async () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const selection = editor.selection;
                await editor.edit(editBuilder => {
                    editBuilder.replace(selection, generator());
                });
            }
        });
        context.subscriptions.push(disposable);
    });
}
function deactivate() { }
//# sourceMappingURL=extension.js.map