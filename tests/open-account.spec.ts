import { Ensure, equals, isTrue } from "@serenity-js/assertions";
import { describe, it } from "@serenity-js/playwright-test";
import { Navigate } from "@serenity-js/web";
import { Login } from "../screenplay/tasks/login";
import { AccountsOverview } from "../screenplay/questions/accounts.overview";
import { NewAccount } from "../screenplay/questions/newaccount";
import { OpenNewAccount } from "../screenplay/tasks/open-new-account";
import { OpenMenu } from "../screenplay/tasks/open-menu";



describe('Open New Account', () => {

    it('Customer should open a new account successfully', async ({ actor }) => {
        await actor.attemptsTo(
            Navigate.to('index.htm'),
        );

        await actor.attemptsTo(
            Login.withCredentials('john', 'demo'),
            Ensure.that(AccountsOverview.headingText(),
                equals('Accounts Overview')),
            Ensure.that(AccountsOverview.accountsTableIsVisible(),
                isTrue())
        );
        await actor.attemptsTo(
            OpenNewAccount.withType('SAVINGS')
        );
        const accountNumber = await actor.answer(
            NewAccount.accountNumber()
        );
        await actor.attemptsTo(OpenMenu.named('Accounts Overview')
        ),
            await actor.attemptsTo(
                Ensure.that(AccountsOverview.headingText(),
                    equals('Accounts Overview')),

                Ensure.that(AccountsOverview.accountsTableIsVisible(),
                    isTrue())
            ),

            await actor.attemptsTo(
                Ensure.that(AccountsOverview.accountNumberIsDisplayed(accountNumber),
                    isTrue())
            )

    });
});
