import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  ColumnDef, 
  flexRender,
  SortingState,
  FilterFn,
  createColumnHelper
} from "@tanstack/react-table";
import { CSVLink } from "react-csv";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  ArrowUpDown, 
  Search, 
  Plus, 
  Download, 
  Edit, 
  Trash, 
  Package, 
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { Product } from "@/lib/types";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Create column helper for Product type
const columnHelper = createColumnHelper<Product>();

const InventoryPage = () => {
  const { toast } = useToast();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    stockQuantity: 0,
    compatibleVehicles: [],
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1590838868821-963ce8e85845?auto=format&fit=crop&q=80&w=500"
  });

  // Fetch products
  const { data: products, isLoading, isError, refetch } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Define table columns
  const columns = [
    columnHelper.accessor('id', {
      header: "ID",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left font-bold whitespace-nowrap"
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('price', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap font-bold"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: info => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('category', {
      header: "Category",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('brand', {
      header: "Brand",
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('stockQuantity', {
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap font-bold"
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: info => {
        const stock = info.getValue();
        return (
          <div className="flex items-center">
            <div className={`mr-2 w-3 h-3 rounded-full ${
              stock <= 0 ? 'bg-red-500' : 
              stock < 5 ? 'bg-yellow-500' : 
              'bg-green-500'
            }`}></div>
            {stock}
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: "Actions",
      cell: (info) => {
        const product = info.row.original;
        return (
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => handleEdit(product)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
              onClick={() => handleDelete(product.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    }),
  ];

  // Create table instance
  const table = useReactTable({
    data: products || [],
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Handle edit product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  // Handle delete product
  const handleDelete = (productId: number) => {
    setDeleteProductId(productId);
    setIsDeleteAlertOpen(true);
  };

  // Delete product function
  const deleteProduct = async () => {
    if (!deleteProductId) return;
    
    try {
      await apiRequest('DELETE', `/api/products/${deleteProductId}`);
      
      // Invalidate query cache
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleteAlertOpen(false);
      setDeleteProductId(null);
    }
  };

  // Update product function
  const updateProduct = async () => {
    if (!editingProduct) return;
    
    try {
      await apiRequest('PUT', `/api/products/${editingProduct.id}`, editingProduct);
      
      // Invalidate query cache
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      
      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Add product function
  const addProduct = async () => {
    try {
      await apiRequest('POST', '/api/products', {
        ...newProduct,
        createdAt: new Date()
      });
      
      // Invalidate query cache
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      
      toast({
        title: "Product added",
        description: "The product has been successfully added.",
      });
      
      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        brand: "",
        category: "",
        stockQuantity: 0,
        compatibleVehicles: [],
        featured: false,
        imageUrl: "https://images.unsplash.com/photo-1590838868821-963ce8e85845?auto=format&fit=crop&q=80&w=500"
      });
      
      setIsAddDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Get low stock products count
  const lowStockCount = products?.filter(p => p.stockQuantity < 5).length || 0;
  
  // Get out of stock products count
  const outOfStockCount = products?.filter(p => p.stockQuantity <= 0).length || 0;

  // Prepare CSV data for export
  const csvData: any[] = products?.map(product => ({
    ID: product.id,
    Name: product.name,
    Price: product.price,
    Category: product.category,
    Brand: product.brand,
    Stock: product.stockQuantity,
    Description: product.description,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Inventory Management
          </h1>
          <p className="text-white/70 mt-1">
            Manage your product inventory, track stock levels, and update product information.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="text-white border-white/10 hover:bg-white/5"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <CSVLink 
            data={csvData} 
            filename="inventory-export.csv"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </CSVLink>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-black/20 border border-white/10 rounded-lg p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-white">Total Products</h3>
            <p className="text-3xl font-bold text-white">{products?.length || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#E53935]/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-[#E53935]" />
          </div>
        </div>
        
        <div className="bg-black/20 border border-white/10 rounded-lg p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-white">Low Stock</h3>
            <p className="text-3xl font-bold text-yellow-500">{lowStockCount}</p>
            <p className="text-sm text-white/60">Items with less than 5 in stock</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-black/20 border border-white/10 rounded-lg p-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-white">Out of Stock</h3>
            <p className="text-3xl font-bold text-red-500">{outOfStockCount}</p>
            <p className="text-sm text-white/60">Items that need restocking</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>
      
      {/* Search */}
      <div className="flex items-center mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search products..."
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white"
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-black/20 border border-white/10 rounded-lg p-4 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin h-8 w-8 border-t-2 border-[#E53935] rounded-full"></div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-32 text-white">
            <p>Error loading inventory data. Please try again.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className="border-b border-white/10">
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id} className="text-white">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="text-white/80">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center text-white/60">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-black border-white/10 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Product Name</Label>
                  <Input
                    id="name"
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="bg-black/30 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="price" className="text-white">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="bg-black/30 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Input
                    id="category"
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="bg-black/30 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="brand" className="text-white">Brand</Label>
                  <Input
                    id="brand"
                    value={editingProduct.brand}
                    onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})}
                    className="bg-black/30 border-white/10 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stockQuantity" className="text-white">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={editingProduct.stockQuantity}
                    onChange={e => setEditingProduct({...editingProduct, stockQuantity: parseInt(e.target.value)})}
                    className="bg-black/30 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="imageUrl" className="text-white">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={editingProduct.imageUrl}
                    onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                    className="bg-black/30 border-white/10 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="featured" className="text-white flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editingProduct.featured}
                      onChange={e => setEditingProduct({...editingProduct, featured: e.target.checked})}
                      className="accent-[#E53935]"
                    />
                    Featured Product
                  </Label>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <textarea
                    id="description"
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-md text-white"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={updateProduct} className="bg-[#E53935] hover:bg-[#C62828]">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-black border-white/10 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-name" className="text-white">Product Name</Label>
                <Input
                  id="add-name"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="add-price" className="text-white">Price ($)</Label>
                <Input
                  id="add-price"
                  type="number"
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="add-category" className="text-white">Category</Label>
                <Input
                  id="add-category"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="add-brand" className="text-white">Brand</Label>
                <Input
                  id="add-brand"
                  value={newProduct.brand}
                  onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-stockQuantity" className="text-white">Stock Quantity</Label>
                <Input
                  id="add-stockQuantity"
                  type="number"
                  value={newProduct.stockQuantity}
                  onChange={e => setNewProduct({...newProduct, stockQuantity: parseInt(e.target.value)})}
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="add-imageUrl" className="text-white">Image URL</Label>
                <Input
                  id="add-imageUrl"
                  value={newProduct.imageUrl}
                  onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
                  className="bg-black/30 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="add-featured" className="text-white flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="add-featured"
                    checked={newProduct.featured}
                    onChange={e => setNewProduct({...newProduct, featured: e.target.checked})}
                    className="accent-[#E53935]"
                  />
                  Featured Product
                </Label>
              </div>
              
              <div>
                <Label htmlFor="add-description" className="text-white">Description</Label>
                <textarea
                  id="add-description"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-md text-white"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={addProduct} className="bg-[#E53935] hover:bg-[#C62828]">Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Alert */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent className="bg-black border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently delete the product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteProduct} 
              className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InventoryPage;