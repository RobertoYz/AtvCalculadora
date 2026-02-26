import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RootLayout() {
	const [display, setDisplay] = useState('0');
  const [valorArmz, setValorArmz] = useState('0');
  const [operador, setOperador] = useState('');

  function Concatenar(numeroDigitado: string){
    if (numeroDigitado === '.'){
      if(display.includes('.')){
        return;
      } else{
        setDisplay(display + numeroDigitado)
      }
    } else{
      if (display === "0"){
        setDisplay(numeroDigitado);
      } else{
        setDisplay(display + numeroDigitado)
      }
    }
  }

  function ColocarOperador(NovoOperador: string){
    if(operador !== ""){
      const X = parseFloat(valorArmz);
      const Y = parseFloat(display);
      let Resultado = parseFloat(display)

      switch(operador){
        case "+":
          Resultado = X + Y;
          break;
        case "-":
          Resultado = X - Y;
          break;
        case "÷":
          Resultado = X / Y;
          break;
        case "x":
          Resultado = X * Y;
          break;
        case "%":
          Resultado = (X * Y)/100;
          break;
        default:
          setDisplay("Error")
          break;
      }
      setValorArmz(String(Resultado))
      setDisplay('0')

    } else{
      setOperador(NovoOperador)
      setValorArmz(display)
      setDisplay('0')
    }
  }

  function RealizarCalculo(){
    const X = parseFloat(valorArmz);
    const Y = parseFloat(display);
    let Resultado = 0

    switch(operador){
      case "+":
        Resultado = X + Y;
        break;
      case "-":
        Resultado = X - Y;
        break;
      case "÷":
        Resultado = X / Y;
        break;
      case "x":
        Resultado = X * Y;
        break;
      // case "%":
      //   Resultado = (X * Y)/100;
      //   break;
      default:
        setDisplay("Error")
        break;
    }
    setDisplay(String(Resultado))
    setValorArmz('0')
    setOperador('')
  }

    function LimparOperacao(){
    setDisplay('0')
    setValorArmz('0')
    setOperador('')
  }

  function LimparDisplay(){
    setDisplay('0')
  }

  function LimparNumero(){
    if(display !== '0' && display.length > 1){
      setDisplay(display.slice(0, -1))
    } else{
      return;
    }
  }

  function AlterarSinais(){
    if (display === '0'){
      return
    } else {
      if (display.startsWith('-')){
        setDisplay(display.slice(1))
      } else{
        setDisplay('-' + display)
      }
    }
  }

	return (
  
		<View style={styles.geral}>
      <View style={styles.Operador}>
        <Text style={styles.textoOperador}>{valorArmz}{operador}</Text>
      </View>
      <View style={styles.display}>
        <Text style={styles.textoDisplay}>{display}</Text>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={[styles.botao, styles.botaoAcao]} onPress={() => LimparOperacao()}><Text style={styles.textoBotao}>C</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoAcao]} onPress={() => LimparDisplay()}><Text style={styles.textoBotao}>CE</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoAcao]} onPress={() => LimparNumero()}><Text style={styles.textoBotao}>L</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoAcao]} onPress={() => RealizarCalculo()}><Text style={styles.textoBotao}>=</Text></TouchableOpacity>
        {/* <TouchableOpacity style={styles.botao} onPress={() => ColocarOperador('%')}><Text style={styles.textoBotao}>%</Text></TouchableOpacity> */}
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('7')}><Text style={styles.textoBotao}>7</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('8')}><Text style={styles.textoBotao}>8</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('9')}><Text style={styles.textoBotao}>9</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => ColocarOperador('+')}><Text style={styles.textoBotao}>+</Text></TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('4')}><Text style={styles.textoBotao}>4</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('5')}><Text style={styles.textoBotao}>5</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('6')}><Text style={styles.textoBotao}>6</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => ColocarOperador('-')}><Text style={styles.textoBotao}>-</Text></TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('1')}><Text style={styles.textoBotao}>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('2')}><Text style={styles.textoBotao}>2</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('3')}><Text style={styles.textoBotao}>3</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => ColocarOperador('x')}><Text style={styles.textoBotao}>x</Text></TouchableOpacity>
      </View>
      <View style={styles.linha}>
        <TouchableOpacity style={styles.botao} onPress={() => AlterarSinais()}><Text style={styles.textoBotao}>-/+</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar('0')}><Text style={styles.textoBotao}>0</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => Concatenar(".")}><Text style={styles.textoBotao}>,</Text></TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => ColocarOperador('÷')}><Text style={styles.textoBotao}>÷</Text></TouchableOpacity>
      </View>
		</View>
	);
}

const styles = StyleSheet.create({
  geral:{
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40
  },

  Operador:{
    alignItems: 'flex-end', 
    marginBottom: 5,        
  },

  textoOperador:{
    color: 'gray',       
    fontSize: 20,           
    fontWeight: '300'       
  },

  display:{
    alignItems: 'flex-end',
    marginBottom: 20
  },

  textoDisplay:{
    color: 'white',
    fontSize: 70,
    fontWeight: '300'
  },

  linha:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  botao:{
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center'
  },

  textoBotao:{
    color: 'white',
    fontSize: 32
  },
  
  botaoAcao:{
    backgroundColor: 'gray'
  }
});