var styles = {
    terminal:{
        window: {
            color: 'white',
            backgroundColor: 'black',
            fontFamily:'courier, "courier new", monospace',
            padding: "10px"
        },
        user: {
            color: 'gray'
        },
        machine: {
            color: 'gray'
        },
        cursorContainer: {

        },
        cursor: {
            width: '10px',
            color: 'grey',
            position: 'relative',
            display: 'inline-block',
            backgroundColor: 'grey'
        },
        cursorNegate: {
            width: '10px',
            color: 'black',
            position: 'relative',
            display: 'inline-block',
            backgroundColor: 'black'
        }
    },
    line: {
        symbol: {
            width: '10px',
            color: 'white',
            backgroundColor: 'black',
            position: 'relative',
            display: 'inline-block'
        },
        specialSymbol: {
            width: '10px',
            color: 'white',
            position: 'relative',
            display: 'inline-block',
            backgroundColor: 'blue'
        },
        specialEmptySymbol: {
            width: '10px',
            color: 'black',
            position: 'relative',
            display: 'inline-block',
            backgroundColor: 'black'
        },
        rightTriangle: {
            width: 0,
            height: 0,
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
            borderLeft: '7px solid blue',
            display: 'inline-block',
            position: 'absolute'
        },
        file:{
            marginRight: '20px',
            color: 'grey'
        },
        info:{
            color: 'grey'
        }
    }
};

// Components
class Cursor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {blink: true};
        this._blink = () => this.setState({blink: !this.state.blink});
    }

    componentDidMount() {
        this.timerId = setInterval(this._blink, 300);
    }

    componentWillUnmount() {
        if(this.timerId){
            clearInterval(this.timerId);
        }
    }

    _getStyles() {
        return this.state.blink ? styles.terminal.cursor : styles.terminal.cursorNegate;
    }

    render() {
        return (<div style={this._getStyles()}>
            {"~"}
        </div>);
    }
}

class LineSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {symbol: props.symbol || ' '};
    }

    render() {
        return (
            <div style={styles.line.symbol}>
                {this.state.symbol}
            </div>
        );
    }
}

class BeginLineSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {symbol: props.symbol || ' '};
    }

    render() {
        return (
            <div style={styles.line.specialSymbol}>
                {this.state.symbol}
            </div>
        );
    }
}

class EmptyBeginLineSymbol extends BeginLineSymbol {
    render() {
        return (
            <div style={styles.line.specialEmptySymbol}>
                {this.state.symbol}
            </div>
        );
    }
}

class TriangleSymbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {symbol: props.symbol || ' '};
    }

    render() {
        return (
            <div style={styles.line.rightTriangle}>
                {this.state.symbol}
            </div>
        );
    }
}

class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            symbols: props.symbols || [],
            typeSymbols: [],
            typedIndex: 1
        };
        this.runTyping = () => this._runTyping()
    }

    _runTyping(){
        setTimeout(function(){
            this.setState({
                typeSymbols: this.state.symbols.slice(0,this.state.typedIndex),
                typedIndex: this.state.typedIndex
            });
            this.state.typedIndex++;
            if(this.state.typedIndex <= this.state.symbols.length){
                this._runTyping();
            }else{
                if(typeof this.props.onFinish == 'function'){
                    setTimeout(this.props.onFinish.bind(this), this.props.waitAfterFinish || 0);
                }
            }
        }.bind(this), this.props.interval);
    }

    _renderSymbol(symbol, index){
        return (
            <LineSymbol key={"c_"+index} symbol={symbol} />
        )
    }

    _renderCursor(){
        return this.props.cursor ? <Cursor/> : null;
    }

    componentDidMount() {
        requestAnimationFrame(this.runTyping);
    }

    render() {
        return (
            <div>
                <BeginLineSymbol symbol={'~'}/><TriangleSymbol/> {this.state.typeSymbols.map(this._renderSymbol)}{this._renderCursor()}
            </div>
        );
    }
}

class InfoLine extends React.Component {
    componentDidMount() {
        if(typeof this.props.onFinish == 'function'){
            setTimeout(this.props.onFinish, this.props.waitAfterFinish || 0);
        }
    }
    render() {
        return (
            <div style={styles.line.info}>
                <EmptyBeginLineSymbol symbol={'~'}/> {this.props.info}
            </div>
        );
    }
}

class InfoFilesLine extends React.Component {
    componentDidMount() {
        if(typeof this.props.onFinish == 'function'){
            setTimeout(this.props.onFinish, this.props.waitAfterFinish || 0);
        }
    }
    _renderFileNames(fileName, index){
        return (<span key={"f_"+index} style={styles.line.file}>{fileName}</span>)
    }
    render() {
        return (
            <div>
                <EmptyBeginLineSymbol symbol={'~'}/> {this.props.files.map(this._renderFileNames.bind(this))}
            </div>
        );
    }
}

class TerminalUser extends React.Component {
    componentDidMount() {
        if(typeof this.props.onFinish == 'function'){
            setTimeout(this.props.onFinish, this.props.waitAfterFinish || 0);
        }
    }
    render(){
        return(
            <span>
        <span style={styles.terminal.user}>{this.props.user}</span>@
        <span style={styles.terminal.machine}>{this.props.machine}</span>:
                {this.props.path || "/"}#
      </span>
        )
    }
}

class Me extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lines: [
                {data:'get about-info'.split(''), waitAfter:1000, type:'line'},

                {data:'Getting about page', waitAfter:1000, type:'line_info'},
                {data:'Hello, I am Alperen Ünal. I\'m a computer engineering student at Erciyes University in Turkey. I have been developing mobile applications via Swift language for iOS platform for more than 2\n' +
                        'year.', waitAfter:1000, type:'line_info'},

                {data:'get languages'.split(''), waitAfter:1000, type:'line'},
                {data:'Swift, JavaScript, Dart, Python, Java, C++', waitAfter:1000, type:'line_info'},
                {data:'get ios-frameworks'.split(''), waitAfter:1000, type:'line'},
                {data:'UIKit, SwiftUI, Combine, Core Data, Core Bluetooth, Core Location, Push Notification', waitAfter:1000, type:'line_info'},
                {data:'get ios-libraries'.split(''), waitAfter:1000, type:'line'},
                {data:'Realm, Firebase Realtime DB, Firebase Storage, Firebase Cloud Messaging, Alamofire, SDWebImage, Lottie', waitAfter:1000, type:'line_info'},




                {data:'get projects'.split(''), waitAfter:1000, type:'line'},
                {data:'Gelecek Bilimde iOS App (Swift)\n', waitAfter:1000, type:'line_info'},
                {data:'https://github.com/gelecek-bilimde/iOS-Application', waitAfter:1000, type:'line_info'},
                {data:'https://apps.apple.com/tt/app/gelecek-bilimde/id1499955244', waitAfter:1000, type:'line_info'},
                {data:'Museum Hunt iOS App (Swift)\n', waitAfter:1000, type:'line_info'},
                {data:'https://github.com/alperen23230/MuseumHunt', waitAfter:1000, type:'line_info'},
                {data:'MeetApp iOS and Android App (React Native)\n', waitAfter:1000, type:'line_info'},
                {data:'https://github.com/alperen23230/Meet-App-React-Native', waitAfter:1000, type:'line_info'},
                {data:'Data Structure and Algorithms Project (C++)\n', waitAfter:1000, type:'line_info'},
                {data:'https://github.com/alperen23230/Data-Structures-Project-CPP', waitAfter:1000, type:'line_info'},


                {data:[], waitAfter:0, type:'line'}
            ],
            typeLines: [],
            typingIndex: 0
        };
        if(this.state.lines.length > 0){
            this.state.typeLines = [this.state.lines[0]];
        }
    }
    handleOnFinish(){
        this.state.typingIndex++;
        if(this.state.typingIndex < this.state.lines.length){
            this.state.typeLines.push(this.state.lines[this.state.typingIndex]);
            this.setState({
                typeLines: this.state.typeLines
            });
        }
    }
    render() {
        return (<div style={styles.terminal.window}>
            <TerminalUser user={"guest"} machine={"alperen-vm"} path={"/"}/>
            {
                this.state.typeLines.map(function(line, index){
                    switch (line.type) {
                        case 'line':
                            return <Line key={"l_"+index}
                                         symbols={line.data}
                                         interval={50}
                                         cursor={this.state.typingIndex == index}
                                         waitAfterFinish={line.waitAfter}
                                         onFinish={()=>this.handleOnFinish()}/>;
                        case 'line_info':
                            return <InfoLine key={"l_"+index}
                                             info={line.data}
                                             waitAfterFinish={line.waitAfter}
                                             onFinish={()=>this.handleOnFinish()}/>;
                        case 'line_info_files':
                            return <InfoFilesLine key={"l_"+index}
                                                  files={line.data}
                                                  waitAfterFinish={line.waitAfter}
                                                  onFinish={()=>this.handleOnFinish()}/>;
                        case 'user':
                            return <TerminalUser key={"l_"+index}
                                                 user={line.data.user}
                                                 path={line.data.path}
                                                 machine={line.data.machine}
                                                 waitAfterFinish={line.waitAfter}
                                                 onFinish={()=>this.handleOnFinish()}/>;
                        default:

                    }

                }.bind(this))
            }
        </div>);
    }
}

export default Me