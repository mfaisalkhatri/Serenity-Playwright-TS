import { Answerable, Task, the } from "@serenity-js/core";
import { By, Click, PageElement } from "@serenity-js/web";


export const OpenMenu = {
    named: (menuname: Answerable<string>) =>
        Task.where(the`#actor opens the ${menuname} menu`,
            Click.on(PageElement.located
                (By.role('link', { name: menuname, exact: true }))
                .describedAs('`${menuName} menu')
            )
        ),
};