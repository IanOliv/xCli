
import { GluegunCommand } from 'gluegun'


const command: GluegunCommand = {
  name: 'xcli',
  description:'list all the command actions',
  run: async toolbox => {
    const { printCommands } = toolbox.print
    printCommands(toolbox, ['connect'])
  },
}

module.exports = command
        