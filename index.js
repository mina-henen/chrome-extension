console.log("vflgjfkj");
function createDiv() {
  console.log("HELLO");
const node = document.getElementById("ConvertForm");
console.log(node)
  node.appendChild(
    `
    <div class="form-outline mb-4">
                                <div class="row" >
                                    <div class="col-md-1">
                                        <label class="form-label" for="form3Example4">To</label>
                                      </div>
                                    <div class="col-md-4">
                                        <div class="dropdown">
                                            <a
                                              class="btn btn-primary dropdown-toggle"
                                              href="#"
                                              role="button"
                                              id="dropdownMenuLink"
                                              data-mdb-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              Currency
                                            </a>
                                          
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                              <li><a class="dropdown-item" href="#">Action</a></li>
                                              <li><a class="dropdown-item" href="#">Another action</a></li>
                                              <li><a class="dropdown-item" href="#">Something else here</a></li>
                                            </ul>
                                          </div>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" id="form12" class="form-control" placeholder="Enter value" required/>
                                    </div>
                        
                                </div>
                                
                            </div>`
  )
}
