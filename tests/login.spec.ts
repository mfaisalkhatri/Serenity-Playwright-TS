import { describe, it } from "@serenity-js/playwright-test"
import { Navigate, Page } from "@serenity-js/web"
import { Ensure, equals, includes, isTrue, } from '@serenity-js/assertions'
import { Login } from '../screenplay/tasks/login'
import { AccountsOverview } from "../screenplay/questions/accounts.overview"

describe('Login', () => {

    it('Customer should login succesfully', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('index.htm'),
            Ensure.that(Page.current().url().href,
                equals('https://parabank.parasoft.com/parabank/index.htm')),
            Ensure.that(Page.current().title(),
                includes('ParaBank')
            ),

            Login.withCredentials('john', 'demo'),
            Ensure.that(AccountsOverview.headingText(),
                equals('Accounts Overview')),

            Ensure.that(AccountsOverview.accountsTableIsVisible(),
                isTrue())

        );
    });
});
