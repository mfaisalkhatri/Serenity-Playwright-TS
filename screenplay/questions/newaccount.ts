import { Question } from "@serenity-js/core";
import { PageElement, Text, By } from "@serenity-js/web";


export const NewAccount = {
    accountNumber:() =>
        Question.about<string> (
            `the newly created account number`,
            async actor => actor.answer(
                Text.of(PageElement.located(By.id('newAccountId')).describedAs('New Account Number'))
            ),

        )

}