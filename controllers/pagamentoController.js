const paypal = require('paypal-rest-sdk');
const conexao = require('../models/Conexao');

exports.criarPagamento = (req, res) => {
    var items = [];
    var subtotal = 0;
    conexao.query('select * from carrinho', (err, products) => {
        if(err) {
            console.log(err);
        } else {
            products.forEach((item, index) => {
                items[index] = {
                    "name": item.produto,
                    "sku": item.produto,
                    "price": item.valor_unitario,
                    "currency": "BRL",
                    "quantity": item.quantidade
                }
                subtotal += (item.valor_unitario * item.quantidade);
            });
        }

        var tax = subtotal * 0.08;
        var total = (subtotal + tax).toFixed(2);
        var pagamento = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://localhost:1122/foodapp/finalizar-pagamento/?total=${total}`,
                "cancel_url": "http://cancel.url"
            },
            "transactions": [{
                "item_list": {
                    "items": items
                },
                "amount": {
                    "currency": "BRL",
                    "total": total,
                    "details": {
                        "subtotal": subtotal,
                        "tax": tax.toFixed(2),
                    }
                },
                "description": "Finalize seu pedido."
            }]
        }
        //res.json(pagamento);
        paypal.payment.create(pagamento, (err, payment) => {
            if(err) {
                res.json(err);
            } else {
                for(var i = 0; i < payment.links.length; i++) {
                    if(payment.links[i].rel == 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    });
};

exports.finalizarPagamento = (req, res) => {
    var paymentId = req.query.paymentId;
    var payerId = req.query.PayerID;
    var total = req.query.total;

    var execucao_pagamento = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "BRL",
                "total": total
            }
        }]
    }

    paypal.payment.execute(paymentId, execucao_pagamento, (error, payment) => {
        if(error) {
            res.json(error);
        } else {
            req.flash('success', 'Pagamento realizado com sucesso! Obrigado pela compra :)');
            conexao.query('truncate table carrinho', (error, result) => {
                if(error) {
                    console.log(error);
                }
            });
            res.redirect('/foodapp');
        }
    });
};