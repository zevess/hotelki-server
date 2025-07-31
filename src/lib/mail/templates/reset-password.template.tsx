import { Body, Heading, Link, Tailwind, Text } from "@react-email/components"
import { Html } from "@react-email/html"
import * as React from 'react'


export const ResetPasswordTemplate = ({ domain, token }: { domain: string, token: string }) => {
    const resetLink = `${domain}/auth/password-recovery/${token}`


    return (
        <Tailwind>
            <Html>
                <Body className='text-black'>
                    <Heading>Сброс пароля</Heading>
                    <Text>
                        Чтобы подтвердить свой пароль, пожалуйста, перейдите по следующей ссылке:
                    </Text>
                    <Link href={resetLink}>Сбросить пароль</Link>
                    <Text>
                        Эта ссылка действительна в течение 1 часа. Если вы не запрашивали подтверждение, просто проигнорируйте это сообщение.
                    </Text>
                </Body>
            </Html>
        </Tailwind>

    )
}