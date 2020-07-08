import React, {useState, useEffect} from 'react';
import './styles.css';
import axios from 'axios'
const api = axios.create({baseURL: 'https://pokeapi.co/api/v2/'})

function Home() {
  const [open,setOpen] = useState(false)
  const [message,setMessage] = useState('')
  const [cart, setCart] = useState([])
  const [list, setList] = useState([])
  const [total,setTotal] = useState(0)
  const [previous, setPrevious] = useState('')
  const [next,setNext] = useState('')
  
  useEffect(()=>{
    api.get('pokemon?limit=151').then(res=>{
      setTotal(res.data.count)
      setList(res.data.results)
      setNext(res.data.next)
      setPrevious(res.data.previous)
    })
  },[])

    function addToCart(id, value){
      let i;
      const valor = {id, value, qtd:1, valor: 1.99}
      console.log(valor)
      setCart(carts=> [...carts, valor])
      for(i=0;i<cart.length;i++){
        if(id === cart[i].id){        
          setOpen(true)
          setMessage('Este card já foi adicionado ao seu carrinho.')
          break
        }
      }
    }

    function addQtd(index){
      cart[index].qtd = cart[index].qtd + 1
      console.log(cart[index].qtd)
    }

    let id = 0
    let CartList = cart.map((item,index)=>
    <>
    <li key={item.id.toString()} className="cartList" style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
    <img height={48} width={48} alt="" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} />        
    <p style={{display:'inline'}}>{item.id} - {item.value.name}</p>
    <div>
    <button onClick={()=>{item.qtd=item.qtd + 1;console.log(item.qtd)}}>+</button>
    <p style={{display:'inline'}}>{item.qtd}</p>
    <button>-</button>
    <p style={{display:'inline'}}>{item.valor * item.qtd}</p>
    </div>
    </li>
    </>
    )
    let Lista = list.map((item, index)=>(
      id=item.url.split("/")[6].toString(),      
      <>
        <li key={id} className="pokelist-info">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />        
        <p>{id} - {item.name}</p>
        <button type="button" className="btn-block" onClick={()=>addToCart(item.url.split("/")[6].toString(), list[index])}>Adicionar ao Carrinho</button>
        </li>
      </>
      )            
      )
  return (
    <>
    <main>
      <section id="pokeDex">
        <ul class="pokelist-container">
        {previous && <li class="previous">Previous</li> }
        {Lista}      
        {next && <li class="next">Next</li> }
        </ul>
        <div id="cart-container">
          <h2>Seu Carrinho no Momento{cart.length ==0 && ' está vazio'}!</h2>
          <div id="cart-content">
            {cart.length === 0 && <p>O seu carrinho está vazio.</p>}
            {cart.length > 0 && CartList}
          </div>
        </div>
      </section>       
    </main>
      <div id="ModalSystem" class="modal" style={{display: open === true ? 'block' : 'none'}}>
    <div class="modal-content">
      <span class="close">&times;</span>
      {message && <p>{message}</p>}
    </div>          
  </div> 
    </>
  );
}

export default Home;
