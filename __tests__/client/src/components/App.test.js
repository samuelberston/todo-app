import React from 'react';
import { mount } from 'enzyme';
import nock from 'nock/types';

import App from '../../../../client/src/components/App';
import Header from '../../../../client/src/components/Header/Header';
import Body from '../../../../client/src/components/Body/Body';

// test App mounts and renders the Header and Body components
test('App mounts and renders the Header and Body components') {
    const wrapper = mount(<App />);

    const app = wrapper.find(App);
    const header = wrapper.find(Header);
    const body = wrapper.find(Body);

    expect(app.exists()).toBe(true);
    expect(header.exists()).toBe(true);
    expect(body.exists()).toBe(true);

    wrapper.unmount(<App />);
}

// test App calls componentDidMount
test('App calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount');
    const wrapper = mount(<Foo />);
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
    // asset(Foo.prototype.componentDidMount.calledOnce);
});

// test App fetches todos (GET /todos)
test('App fetches todos (GET /todos)', () => {
    nock('http://localhost:3000')
        .get('/todos')
        .reply(200, [{todo_id: 1}]);
    
});


// test App updates state