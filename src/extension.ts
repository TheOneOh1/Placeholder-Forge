import * as vscode from 'vscode';
import { faker } from '@faker-js/faker';

export function activate(context: vscode.ExtensionContext) {
    // Generator functions
    const generators = {
        generateName: () => faker.person.fullName(),
        generateEmail: () => faker.internet.email(),
        generatePhone: () => faker.phone.number(),
        generateAddress: () => `${faker.location.streetAddress()}\n${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
        generateCompany: () => faker.company.name(),
        generateBank: () => faker.company.name() + ' Bank',
        generateLorem: () => faker.lorem.paragraph()
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

export function deactivate() {} 