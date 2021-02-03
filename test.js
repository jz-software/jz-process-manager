const ProcessManager = require('./index');
// const pm = new ProcessManager('http://analytics.jz-software.com:443', '1e5c83f5-6d78-42ed-830b-308c3a785a54', '97a50bda-0f9a-47da-8560-b055d58809c3', 2000);

const pm = new ProcessManager('ws://localhost:8080/', '1e5c83f5-6d78-42ed-830b-308c3a785a54', '97a50bda-0f9a-47da-8560-b055d58809c3', 100);