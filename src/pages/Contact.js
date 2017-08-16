/*
 * Components
 */

var ContactForm = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  
  onNameChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}));
  },
  
  onEmailChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}));
  },
  
  onDescriptionChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit();
  },

  render: function() {
    var errors = this.props.value.errors || {};

    return (
      React.createElement('form', {onSubmit: this.onSubmit, className: 'ContactForm', noValidate: true},
        React.createElement('input', {
          type: 'text',
          className: errors.name && 'ContactForm-error',
          placeholder: 'Name (required)',
          value: this.props.value.name,
          onChange: this.onNameChange,
        }),
        React.createElement('input', {
          type: 'email',
          className: errors.email && 'ContactForm-error',
          placeholder: 'Email (required)',
          value: this.props.value.email,
          onChange: this.onEmailChange,
        }),
        React.createElement('textarea', {
          placeholder: 'Description',
          value: this.props.value.description,
          onChange: this.onDescriptionChange,
        }),
        React.createElement('button', {type: 'submit', className: "btn btn-info"}, "Add Contact")
      )
    );
  },
});


var ContactItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
  },

  render: function() {
    return (
      React.createElement('li', {className: 'ContactItem'},
        React.createElement('h2', {className: 'ContactItem-name'}, this.props.name),
        React.createElement('a', {className: 'ContactItem-email', href: 'mailto:'+this.props.email}, this.props.email),
        React.createElement('div', {className: 'ContactItem-description'}, this.props.description)
      )
    );
  },
});


var ContactView = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    newContact: React.PropTypes.object.isRequired,
    onNewContactChange: React.PropTypes.func.isRequired,
    onNewContactSubmit: React.PropTypes.func.isRequired,
  },

  render: function() {
    var contactItemElements = this.props.contacts
      .filter(function(contact) { return contact.email; })
      .map(function(contact) { return React.createElement(ContactItem, contact); });

    return (
      React.createElement('div', {className: 'ContactView'},
        React.createElement('h1', {className: 'ContactView-title'}, "Contacts"),
        React.createElement('ul', {className: 'ContactView-list'}, contactItemElements),
        React.createElement(ContactForm, {
          value: this.props.newContact,
          onChange: this.props.onNewContactChange,
          onSubmit: this.props.onNewContactSubmit,
        })
      )
    );
  },
});


/*
 * Constants
 */


var CONTACT_TEMPLATE = {name: "", email: "", description: "", errors: null};



/*
 * Actions
 */


function updateNewContact(contact) {
  setState({ newContact: contact });
}


function submitNewContact() {
  var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});
  
  if (!contact.name) {
    contact.errors.name = ["Please enter your new contact's name"];
  }
  if (!/.+@.+\..+/.test(contact.email)) {
    contact.errors.email = ["Please enter your new contact's email"];
  }

  setState(
    Object.keys(contact.errors).length === 0 ? {
        newContact: Object.assign({}, CONTACT_TEMPLATE),
        contacts: state.contacts.slice(0).concat(contact),
      }
    : { newContact: contact }
  );
}


/*
 * Model
 */


// The app's complete current state
var state = {};

// Make the given changes to the state and perform any required housekeeping
function setState(changes) {
  Object.assign(state, changes);
  
  ReactDOM.render(
    React.createElement(ContactView, Object.assign({}, state, {
      onNewContactChange: updateNewContact,
      onNewContactSubmit: submitNewContact,
    })),
    document.getElementById('react-app')
  );
}

// Set initial data
setState({
  contacts: [
    {key: 1, name: "James K Nelson", email: "james@jamesknelson.com", description: "Front-end Unicorn"},
    {key: 2, name: "Jim", email: "jim@example.com"},
  ],
  newContact: Object.assign({}, CONTACT_TEMPLATE),
});
