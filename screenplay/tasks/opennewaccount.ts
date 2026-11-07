import { Answerable, Task, the } from "@serenity-js/core";
import { By, Click, Enter, Page, PageElement, Select, SelectOption } from "@serenity-js/web"

export const OpenNewAccount = {
    withType: (accountType: Answerable<string>, fromAccountId: Answerable<string>) =>
        Task.where(the`#actor opens a new ${accountType} account`,

            Click.on(PageElement.located(By.role('link', { name: 'Open New Account', exact: true })
                .describedAs('Open New Account menu link'))

            ),
            Select.option(accountType).from
                (PageElement.located(By.id('type').describedAs('Account Type Select dropdown'))
                ),

            Select.option(fromAccountId).from
                (PageElement.located(By.id('fromAccountId').describedAs('From Acount Id Number dropdown'))
                ),
            Click.on(PageElement.located(By.role('button', { name: 'Open New Account', exact: true).describedAs('Open New Account button')
            ))
        ),

};