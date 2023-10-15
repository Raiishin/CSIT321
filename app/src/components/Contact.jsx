import React from 'react';

const contactData = [
  {
    name: 'Gavin',
    email: 'gavin@staff.sim.edu.sg'
  },
  {
    name: 'Andy',
    email: 'andy@staff.sim.edu.sg'
  },
  {
    name: 'Wei Feng',
    email: 'weifeng@staff.sim.edu.sg'
  },
  {
    name: 'Kee Yang',
    email: 'keeyang@staff.sim.edu.sg'
  },
  {
    name: 'Joe',
    email: 'joe@staff.sim.edu.sg'
  }
];

const Contact = () => {
  return (
    <div className="p-6">
      <div>
        <h1 className="text-4xl sm:text-4xl font-bold text-cyan">Contact Us</h1>
        <p className="w-3/4 text-cyan inline-block pt-4">
          If you have any questions or concerns, please contact us at:
          <ul style={{ listStyleType: 'disc' }}>
            {contactData.map((contact, index) => (
              <li key={index} style={{ paddingLeft: '1em' }}>
                {contact.name}: {contact.email}
              </li>
            ))}
          </ul>
        </p>
      </div>
    </div>
  );
};

export default Contact;
