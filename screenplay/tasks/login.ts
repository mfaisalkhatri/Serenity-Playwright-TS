import { Answerable, Task, the } from "@serenity-js/core";
import {By, Click, Enter, PageElement} from "@serenity-js/web"    

export const Login = {
    withCredentials: (username:Answerable<string>, password:Answerable<string>) =>
        Task.where (the `#actor logs in with the username ${username}`,
        
            Enter.theValue(username).into(
                PageElement.located(By.css('input[name="username"]'))
                .describedAs('Username field')
            ),
            Enter.theValue(password).into(
                PageElement.located(By.css('input[name="password"]'))
                .describedAs('Password field')
            ),
            Click.on(PageElement.located(By.role('button', { name: 'Log In', exact: true }))
            .describedAs('Login Button')
        ),
    ),
};
