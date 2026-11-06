import { By, PageElement, Text } from '@serenity-js/web'
import { Question } from "@serenity-js/core"

export const AccountsOverview = {
    headingText: () =>
        Question.about<string>(
            'the account overview heading',
            async actor => actor.answer(
                Text.of(PageElement.located(By.role('heading', { name: "Accounts Overview", exact: true })
                    .describedAs('Accounts Overview heading')
                )))
        ),


    accountsTableIsVisible: () =>
        Question.about<boolean>(
            'whether the account table is visible',
            async actor => actor.answer(
                PageElement.located(
                    By.id('accountTable')
                ).isVisible()
            )
        ),

};


