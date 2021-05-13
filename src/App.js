import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { TokenProvider } from "./hooks/useAuth";
import { Nav_ as Nav } from "./components/Nav";
import { Landing } from "./pages/Landing";
import { Groups as GroupsPage } from "./pages/Groups";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/Profile";
import { GroupPage } from "./pages/GroupPage";
import { CreateGroup } from "./pages/CreateGroup";
import { ForumPage } from "./pages/Forum";
import { TopicPage } from "./pages/Topic";
import { CreateTopic } from "./pages/CreateTopic";

function App() {
  return (
    <TokenProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/groups" exact component={GroupsPage} />
          <Route path="/auth" exact component={AuthPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/group/:id" exact component={GroupPage} />
          <Route path="/create-group/" exact component={CreateGroup} />
          <Route path="/forum/" exact component={ForumPage} />
          <Route path="/forum/:topicId" exact component={TopicPage} />
          <Route path="/create-topic" exact component={CreateTopic} />
        </Switch>
      </Router>
    </TokenProvider>
  );
}

export default App;
