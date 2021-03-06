const { ApolloServer, gql } = require('apollo-server')
// const cors = require('cors')
// const express = require('express')
// const app = express()
// app.use(cors())

const data = {
  contact_details: {
    fullName: 'Karolis Stulgys',
    email: 'karolis.stulgys@gmail.com',
    github: 'https://github.com/kstulgys',
    curriculum_vitae: 'https://bit.ly/2ShKcvV'
  },

  social_media: {
    github: 'https://github.com/kstulgys',
    linkedIn: 'https://linkedin.com/in/karolis-stulgys',
    instagram: 'https://www.instagram.com/karolis_stulgys',
    medium: 'https://medium.com/karolis-stulgys'
  },

  skill_set: {
    frontend: [
      'react',
      'apollo-client',
      'html, css',
    ],
    backend: ['apollo-server', 'firestore/firebase', 'prisma', 'mongoDB']
  },

  portfolio: [
    
    {
      name: 'codesandbox',
      liveUrl: 'https://codesandbox.io/u/kstulgys',
      description: 'Small apps while learning things'
    },
    {
      name: 'mvc-vanillajs-recipes-app',
      liveUrl: 'https://mvc-vanillajs-recipes-app.netlify.com/',
      gitRepo: 'https://github.com/kstulgys/mvc-vanillajs-recipes-app/tree/master',
      description:
        'Recipe search application',
      features: [
        'Search by term',
        'Pagination',
        'Get ingredient list and recipe info',
        'Add ingredient list to shopping cart',
        'Add recipe to favorites and localStorage',
      ],
      stack: ['sass']
    },
     {
      name: 'booking-app-css',
      liveUrl: 'https://hotel-booking-app-css.netlify.com/',
      gitRepo: 'https://github.com/kstulgys/booking-app-css',
      description:
        'Hotel booking app styled with pure CSS',
      features: [
        'Modern',
        'Responsive',
      ],
      stack: ['HTML', 'CSS']
    },
    {
      name: 'lg-macros',
      liveUrl: 'https://lg-macros.netlify.com/',
      gitRepo: 'https://github.com/kstulgys/lg-macros',
      description:
        'Calories, macros and meal planner based on Lean Gains method',
      features: [
        'Calories calculator',
        'Custom fiber intake',
        'Macros split per calories',
      ],
      stack: ['react', 'Shards UI']
    },
    {
      name: 'rpetify',
      liveUrl: 'https://rpetify.netlify.com/',
      gitRepo: 'https://github.com/kstulgys/rpetify',
      description:
        'Workout app that calulates weights based on RPE (rate of perceived exertion) and plates on the bar',
      features: [
        'Add/Delete lifts',
        'Add/Delete sets',
        'Calculate weights based on RPE',
        'Calculate plates on bar for warmup and worksets'
      ],
      stack: ['react', 'localStorage', 'shards-UI']
    },
    {
      name: 'slack-clone-react-firebase',
      liveUrl: 'https://slack-clone-react-firebase.netlify.com/',
      gitRepo: 'https://github.com/kstulgys/slack-clone-react-firebase',
      description:
        'Sample chat application powered by firebase/firestore real time database',
      features: [
        'file upload',
        'user registration and authentication',
        'only registered users can write and read channels and messages'
      ],
      stack: ['react', 'firebase/firestore', 'semantic UI']
    },
    {
      name: 'twitter-clone-apollo',
      liveUrl: 'https://twitter-clone-apollo-client.herokuapp.com',
      gitRepo: 'https://github.com/kstulgys/twitter-clone-apollo',
      description: 'Sample Twitter clone',
      features: [
        'user registration',
        'client subscriptions for new posts and post likes',
        'optimistic UI'
      ],
      stack: ['react', 'mongoDB', 'apollo-server', 'apollo-client', 'antd-ui']
    }
  ]
}
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Project {
    name: String
    liveUrl: String
    gitRepo: String
    description: String
    features: [String]
    stack: [String]
  }

  type Query {
    CONTACT_DETAILS: Details
    SKILL_SET: Technologies
    PORTFOLIO: [Project]!
    SOCIAL_MEDIA: Social
  }

  type Technologies {
    frontend: [String]
    backend: [String]
  }

  type Social {
    github: String
    linkedIn: String
    instagram: String
    medium: String
  }

  type Details {
    fullName: String
    email: String
    github: String
    curriculum_vitae: String
  }
`

// Provide resolver functions for schema fields
const resolvers = {
  Query: {
    CONTACT_DETAILS: () => data.contact_details,
    SKILL_SET: () => {
      return {
        frontend: data.skill_set.frontend.map(ft => ft),
        backend: data.skill_set.backend.map(bt => bt)
      }
    },
    PORTFOLIO: () => data.portfolio.map(p => p),
    SOCIAL_MEDIA: () => {
      return {
        github: data.social_media.github,
        linkedIn: data.social_media.linkedIn,
        instagram: data.social_media.instagram,
        medium: data.social_media.medium
      }
    }
  }
}

const defaultQuery = `
# Hello and Wellcome! I'm pleased you have made it to my site
# I'm Karolis, 28 y male open-minded, self-taught Front-End/Full-Stack Developer
# I have a great interest in web-development, athletic performance and longevity

# I have made this GraphQL API as my page because everyone loves GraphQL
# If you are not familiar with it make sure to check the docs @ https://graphql.org/
# P.S if you want to know me better just click "Play" to run the default query!
# I'm looking forward to hearing from you @ karolis.stulgys@gmail.com :)

query {
  CONTACT_DETAILS {
    fullName
    email
    github
    curriculum_vitae
  }

  # SOCIAL_MEDIA {
  #  instagram
  #  github
  #  linkedIn
  #  medium
  # }

  PORTFOLIO {
    name
    liveUrl
    gitRepo
    description
    # features
    # stack

  }

  # SKILL_SET {
  #  frontend
  #  backend
  # }
}
`

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    data
  },
  playground: {
    tabs: [
      {
        endpoint: '',
        query: defaultQuery,
        name:
          '==================================> CLICK ON THIS TAB <=================================='
      }
    ],
    settings: {
      // 'general.betaUpdates': false,
      // 'editor.cursorShape': 'line',
      'editor.fontSize': 13,
      // 'editor.fontFamily':
      // "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
      'editor.theme': 'dark'
      // 'editor.reuseHeaders': true,
      // 'prettier.printWidth': 80,
      // 'request.credentials': 'same-origin'
      // 'tracing.hideTracingResponse': true
    }
    // endpoint: '',
  },
  introspection: true
  // playground: true
})

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
