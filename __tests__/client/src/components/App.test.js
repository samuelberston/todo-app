import React from 'react';
import { mount } from 'enzyme';

import App from '../../../../client/src/components/App';
import Header from '../../../../client/src/components/Header/Header';
import Body from '../../../../client/src/components/Body/Body';

// test App mounts and renders the Header and Body components
test('App mounts and renders the Header and Body components') {
    const wrapper = mount(<App />);
    const app = wrapper.find('.app');
    expect(app.exists()).toBe(true);
}


// test App fetches todos (GET /todos)

// test App updates state