import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';

class App extends Component {
  state = {
    notes: [
      {
        id: 1,
        note: 'Hello world'
      }
    ]
  };

  render() {
    const { notes } = this.state;

    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-l">Notetaker</h1>
        <form className="mb3">
          <input type="text" className="pa2 f4" placeholder="Write your note" />
        </form>

        <div>
          {notes.map(item => (
            <div key={item.id} className="flex items-center">
              <li className="list pa2 f3">{item.note}</li>
              <button className="bg-transparent bn f4">
                <span>&times;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// marian.ban@hotmail.com
// Marian$11

export default withAuthenticator(App, { includeGreetings: true });
