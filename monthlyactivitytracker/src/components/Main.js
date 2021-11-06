import React from 'react';
import Activity from './Activity';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      activities: [],
    };
  }

  componentDidMount() {
    if (localStorage.activities) {
      this.setState({ activities: JSON.parse(localStorage.activities) || [] });
    }
    window.addEventListener('beforeunload', this.handleUpdateLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUpdateLocalStorage);
  }

  handleChange = ({ target }) => {
    let { value } = target;
    this.setState({ inputText: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputText !== '') {
      let activity = {
        activityName: this.state.inputText,
        activityDays: [],
      };
      this.setState({
        activities: [...this.state.activities, activity],
        inputText: '',
      });
    }
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit(event);
    }
  };

  handleRemove = ({ target }) => {
    let { id } = target;
    console.log(id);
    this.setState((prevState) => ({
      activities: prevState.activities.filter(
        (a) => a !== prevState.activities[id]
      ),
    }));
  };

  handleClick = (event) => {
    let { id, value } = event.target;

    let activities = this.state.activities;
    if (!activities[id].activityDays.includes(value)) {
      activities[id].activityDays.push(value);
      let activity = activities[id].activityDays;
      this.setState((prevState) => {
        let updatedActivity = prevState.activities.map((a, i) => {
          console.log(a, i);
          if (i === Number(id)) {
            return {
              ...a,
              activityDays: activity,
            };
          }
          return a;
        });
        return { activities: updatedActivity };
      });
    } else {
      this.setState((prevState) => {
        let index = activities[id].activityDays.findIndex(
          (a) => a === String(value)
        );
        activities[id].activityDays.splice(index, 1);
        let activity = activities[id].activityDays;
        let updatedActivity = prevState.activities.map((a, i) => {
          if (i === Number(id)) {
            return {
              ...a,
              activityDays: activity,
            };
          }
          return a;
        });
        return {
          activities: updatedActivity,
        };
      });
    }
  };

  handleUpdateLocalStorage = () => {
    localStorage.setItem('activities', JSON.stringify(this.state.activities));
  };

  render() {
    return (
      <main className="container">
        <h1 className="title">Monthly Activity Tracker!</h1>
        <div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="wrapper">
              <input
                type="text"
                name="input"
                placeholder="eg: Learn React"
                className="handleInput"
                onChange={this.handleChange}
                value={this.state.inputText}
                onKeyDown={this.handleKeyDown}
              />
              <input type="submit" value="Add Activity" className="btn_sub" />
            </div>
          </form>
        </div>

        {this.state.activities.length ? (
          <div className="activity_sec">
            <Activity
              {...this.state}
              handleRemove={this.handleRemove}
              handleClick={this.handleClick}
            />
          </div>
        ) : (
          ''
        )}
      </main>
    );
  }
}

export default Main;
