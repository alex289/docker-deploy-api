import { ANSI, CLITest } from 'interactive-cli-tester';

let command = 'npx';

if (process.platform === 'win32') {
    command = 'npx.cmd';
}

const cliTest = new CLITest(
    command,
    ['nyc', '-r', 'none', 'node', 'dist/cli.js'],
    {
        process: {
            // @ts-expect-error Wrong type definitions?
            shell: true,
        },
    },
);

test('Run CLI', async () => {
    await cliTest.run();
    await cliTest.waitForOutput('What do you want to do?');
    await cliTest.write(ANSI.CURSOR_DOWN);
    await cliTest.write(ANSI.CURSOR_DOWN);
    await cliTest.write(ANSI.CURSOR_DOWN);
    await cliTest.write(ANSI.CR);
    expect(await cliTest.waitForExit()).toBe(0);
});
